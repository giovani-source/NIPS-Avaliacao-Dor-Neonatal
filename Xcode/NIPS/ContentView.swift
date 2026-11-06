import SwiftUI
import WebKit
import UIKit
import UniformTypeIdentifiers

/// Handler de esquema customizado (`nips-app://app/...`) para servir o bundle React/Vite/Tailwind
/// diretamente do pacote iOS com suporte completo a CORS, ES Modules, SVG, Canvas e áreas seguras.
final class WebBundleSchemeHandler: NSObject, WKURLSchemeHandler {
    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(URLError(.badURL))
            return
        }

        var relativePath = url.path
        if relativePath.hasPrefix("/") {
            relativePath.removeFirst()
        }
        if relativePath.isEmpty {
            relativePath = "index.html"
        }

        guard let bundleRoot = Bundle.main.resourceURL?.appendingPathComponent("WebBundle") else {
            urlSchemeTask.didFailWithError(URLError(.fileDoesNotExist))
            return
        }

        var targetURL = bundleRoot.appendingPathComponent(relativePath)
        if !FileManager.default.fileExists(atPath: targetURL.path) {
            targetURL = bundleRoot.appendingPathComponent("index.html")
        }

        do {
            let data = try Data(contentsOf: targetURL)
            let mimeType = Self.mimeType(for: targetURL.pathExtension)
            let response = HTTPURLResponse(
                url: url,
                statusCode: 200,
                httpVersion: "HTTP/1.1",
                headerFields: [
                    "Content-Type": mimeType,
                    "Content-Length": "\(data.count)",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-cache"
                ]
            )!
            urlSchemeTask.didReceive(response)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()
        } catch {
            urlSchemeTask.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    private static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html": return "text/html; charset=utf-8"
        case "js", "mjs": return "application/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "svg": return "image/svg+xml"
        case "png": return "image/png"
        case "json", "webmanifest": return "application/manifest+json; charset=utf-8"
        case "ico": return "image/x-icon"
        default: return "application/octet-stream"
        }
    }
}

/// Bridge para interceptar `window.print()` do aplicativo web e acionar o `UIPrintInteractionController` nativo do iOS.
final class NativePrintScriptHandler: NSObject, WKScriptMessageHandler {
    weak var webView: WKWebView?

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        if message.name == "nativePrint", let webView = self.webView {
            DispatchQueue.main.async {
                let printController = UIPrintInteractionController.shared
                let printInfo = UIPrintInfo(dictionary: nil)
                printInfo.outputType = .general
                printInfo.jobName = "NIPS — Avaliação da Dor Neonatal"
                printController.printInfo = printInfo
                printController.printFormatter = webView.viewPrintFormatter()
                printController.present(animated: true, completionHandler: nil)
            }
        }
    }
}

struct NipsWebView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(WebBundleSchemeHandler(), forURLScheme: "nips-app")

        let contentController = WKUserContentController()
        let printOverrideScript = WKUserScript(
            source: """
            window.print = function() {
                if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativePrint) {
                    window.webkit.messageHandlers.nativePrint.postMessage({});
                }
            };
            """,
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: true
        )
        contentController.addUserScript(printOverrideScript)
        contentController.add(context.coordinator.printHandler, name: "nativePrint")
        config.userContentController = contentController

        let webView = WKWebView(frame: .zero, configuration: config)
        context.coordinator.printHandler.webView = webView
        webView.navigationDelegate = context.coordinator
        webView.scrollView.bounces = true
        webView.scrollView.contentInsetAdjustmentBehavior = .always
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 246/255, green: 249/255, blue: 248/255, alpha: 1.0)
        webView.scrollView.backgroundColor = UIColor(red: 246/255, green: 249/255, blue: 248/255, alpha: 1.0)

        if let startURL = URL(string: "nips-app://app/index.html") {
            webView.load(URLRequest(url: startURL))
        }

        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate {
        let printHandler = NativePrintScriptHandler()

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            guard let url = navigationAction.request.url else {
                decisionHandler(.allow)
                return
            }

            if url.scheme == "data",
               let dataUrlString = url.absoluteString.removingPercentEncoding,
               dataUrlString.hasPrefix("data:image/png;base64,") {
                let base64Part = String(dataUrlString.dropFirst("data:image/png;base64,".count))
                if let pngData = Data(base64Encoded: base64Part),
                   let image = UIImage(data: pngData) {
                    DispatchQueue.main.async {
                        if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                           let rootVC = scene.windows.first?.rootViewController {
                            let activityVC = UIActivityViewController(
                                activityItems: [image],
                                applicationActivities: nil
                            )
                            rootVC.present(activityVC, animated: true)
                        }
                    }
                }
                decisionHandler(.cancel)
                return
            }

            decisionHandler(.allow)
        }
    }
}

struct ContentView: View {
    var body: some View {
        ZStack {
            Color(red: 246/255, green: 249/255, blue: 248/255)
                .ignoresSafeArea()
            NipsWebView()
        }
    }
}
