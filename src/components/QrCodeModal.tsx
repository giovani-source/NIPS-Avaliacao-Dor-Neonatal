import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  resolveCurrentPublicAppUrl,
  validatePublicAppUrl,
} from '../utils/qrUrlValidator';

interface QrCodeScreenProps {
  onClose: () => void;
  configuredPublicUrl?: string;
}

export const QrCodeScreen: React.FC<QrCodeScreenProps> = ({
  onClose,
  configuredPublicUrl,
}) => {
  const envUrl =
    configuredPublicUrl ??
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PUBLIC_APP_URL
      ? String(import.meta.env.VITE_PUBLIC_APP_URL)
      : '');

  const initialResolution = resolveCurrentPublicAppUrl(
    envUrl,
    typeof window !== 'undefined' ? window.location.href : undefined
  );

  const [customDeploymentUrl, setCustomDeploymentUrl] = useState<string>(
    initialResolution.sanitizedUrl ?? ''
  );
  const [activeValidation, setActiveValidation] = useState(() =>
    initialResolution.isValid
      ? initialResolution
      : validatePublicAppUrl(customDeploymentUrl)
  );
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (activeValidation.isValid && activeValidation.sanitizedUrl) {
      QRCode.toDataURL(activeValidation.sanitizedUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#153238',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      })
        .then((url) => {
          if (!cancelled) {
            setQrDataUrl(url);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setQrDataUrl(null);
          }
        });
    } else {
      setQrDataUrl(null);
    }

    return () => {
      cancelled = true;
    };
  }, [activeValidation.isValid, activeValidation.sanitizedUrl]);

  const handleApplyDeploymentUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validatePublicAppUrl(customDeploymentUrl);
    setActiveValidation(result);
    if (result.sanitizedUrl) {
      setCustomDeploymentUrl(result.sanitizedUrl);
    }
  };

  const handleCopyLink = async () => {
    if (!activeValidation.isValid || !activeValidation.sanitizedUrl) return;
    try {
      await navigator.clipboard.writeText(activeValidation.sanitizedUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      setShareMessage('Não foi possível copiar automaticamente. Selecione e copie o endereço.');
    }
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl || !activeValidation.isValid) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode-nips-avaliacao-dor-neonatal.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNativeShare = async () => {
    if (!activeValidation.isValid || !activeValidation.sanitizedUrl) return;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'NIPS — Avaliação da Dor Neonatal',
          text: 'Acesse o instrumento clínico NIPS — Avaliação da Dor Neonatal no seu iPhone:',
          url: activeValidation.sanitizedUrl,
        });
        setShareMessage('Endereço compartilhado com sucesso.');
      } catch {
        // Cancelado pelo usuário
      }
    } else {
      await handleCopyLink();
    }
  };

  return (
    <section
      aria-labelledby="qr-screen-title"
      className="w-full max-w-md mx-auto flex flex-col gap-5 pb-6"
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2A8F7D]">
            Acesso Rápido na Unidade
          </span>
          <h1
            id="qr-screen-title"
            className="text-xl font-bold text-[#153238] mt-0.5"
          >
            Compartilhar aplicativo com QR code
          </h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] px-4 rounded-xl bg-white border border-[#D5E3E0] text-sm font-semibold text-[#1B5E6B] hover:bg-[#EDF5F3] active:scale-[0.99] transition"
        >
          Voltar
        </button>
      </div>

      {/* Explicação de segurança clínica */}
      <div className="bg-white rounded-2xl p-5 border border-[#DDE9E6] shadow-xs space-y-4">
        <p className="text-sm text-[#39585F] leading-relaxed">
          Este QR code representa <strong>exclusivamente o endereço público HTTPS</strong> do
          aplicativo NIPS, permitindo que médicos e enfermeiros abram a ferramenta diretamente no
          Safari do iPhone.
        </p>

        <div className="rounded-xl bg-[#EDF7F4] border border-[#BEE3DA] px-3.5 py-2.5 text-xs text-[#1B5E6B] flex items-start gap-2.5">
          <span className="font-bold text-sm leading-none mt-0.5" aria-hidden="true">
            ✓
          </span>
          <span>
            Privacidade garantida: nenhum dado de paciente ou resultado clínico é incluído no QR
            code.
          </span>
        </div>

        {/* Se houver URL HTTPS válida publicada ou informada */}
        {activeValidation.isValid && activeValidation.sanitizedUrl ? (
          <div className="flex flex-col items-center pt-2 space-y-4">
            <div className="p-4 bg-white rounded-2xl border-2 border-[#1B5E6B]/20 shadow-xs flex items-center justify-center min-w-[220px] min-h-[220px]">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR code de acesso público para ${activeValidation.sanitizedUrl}`}
                  className="w-52 h-52 object-contain"
                />
              ) : (
                <div
                  role="status"
                  className="text-xs text-[#39585F] text-center px-4 py-8"
                >
                  QR code validado para:
                  <br />
                  <strong className="break-all text-[#153238]">
                    {activeValidation.sanitizedUrl}
                  </strong>
                </div>
              )}
            </div>

            <div className="w-full bg-[#F6F9F8] rounded-xl px-3.5 py-2.5 border border-[#DDE9E6] text-center">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#52737A]">
                URL Pública HTTPS Validada
              </p>
              <p
                data-testid="validated-public-url"
                className="text-xs font-mono text-[#153238] break-all mt-0.5"
              >
                {activeValidation.sanitizedUrl}
              </p>
            </div>

            {/* Ações */}
            <div className="w-full grid grid-cols-1 gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full min-h-[50px] rounded-xl bg-[#1B5E6B] text-white font-semibold text-sm px-4 py-3 hover:bg-[#154B56] active:scale-[0.99] transition flex items-center justify-center gap-2 shadow-xs"
              >
                {copySuccess ? 'Link copiado para a área de transferência!' : 'Copiar link HTTPS'}
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={!qrDataUrl}
                  className="min-h-[48px] rounded-xl bg-white border border-[#1B5E6B]/30 text-[#1B5E6B] font-semibold text-sm px-3 py-2.5 hover:bg-[#EDF7F4] disabled:opacity-50 transition"
                >
                  Baixar PNG
                </button>
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="min-h-[48px] rounded-xl bg-[#DDF3EE] text-[#153238] font-semibold text-sm px-3 py-2.5 hover:bg-[#CBEBE3] transition"
                >
                  Compartilhar
                </button>
              </div>
            </div>

            {shareMessage && (
              <p className="text-xs text-[#2A8F7D] font-medium text-center">{shareMessage}</p>
            )}
          </div>
        ) : (
          /* Estado em desenvolvimento local (localhost / app nativo sem URL HTTPS configurada) */
          <div
            data-testid="localhost-qr-warning"
            className="rounded-2xl bg-[#FDF1EF] border border-[#EBC5BD] p-4 space-y-2.5"
          >
            <div className="flex items-center gap-2 text-[#9F3A2B] font-semibold text-sm">
              <span aria-hidden="true">●</span>
              <span>Ambiente local detectado — QR code público desativado</span>
            </div>
            <p className="text-xs text-[#733227] leading-relaxed">
              Durante a execução local (<code>localhost</code> ou simulador sem domínio publicado),
              o aplicativo não apresenta endereço local como QR code público funcional, pois outros
              iPhones não conseguiriam acessá-lo com segurança.
            </p>
            <p className="text-xs text-[#733227] leading-relaxed">
              Assim que a aplicação for publicada em um domínio HTTPS (por exemplo, Vercel ou
              Netlify), o QR code será exibido automaticamente. Você também pode informar a URL
              HTTPS publicada abaixo para gerar o QR code imediatamente:
            </p>
          </div>
        )}

        {/* Formulário para configurar/testar URL pública HTTPS de implantação */}
        <form onSubmit={handleApplyDeploymentUrl} className="pt-2 border-t border-[#E8F0EE] space-y-2.5">
          <label
            htmlFor="public-https-url-input"
            className="block text-xs font-semibold text-[#39585F]"
          >
            URL pública HTTPS de implantação (Vercel / Netlify / Institucional):
          </label>
          <div className="flex gap-2">
            <input
              id="public-https-url-input"
              type="url"
              inputMode="url"
              placeholder="https://nips-neonatal.vercel.app"
              value={customDeploymentUrl}
              onChange={(e) => setCustomDeploymentUrl(e.target.value)}
              className="flex-1 min-h-[46px] rounded-xl border border-[#CBDCD8] bg-[#F9FBFA] px-3.5 text-sm text-[#153238] placeholder:text-[#7E9A9F] focus:outline-none focus:ring-2 focus:ring-[#1B5E6B]"
            />
            <button
              type="submit"
              className="min-h-[46px] px-4 rounded-xl bg-[#1B5E6B] text-white text-xs font-semibold hover:bg-[#154B56] transition shrink-0"
            >
              Validar URL
            </button>
          </div>
          {!activeValidation.isValid && customDeploymentUrl.trim() !== '' && (
            <p role="alert" className="text-xs text-[#B84A39] font-medium">
              {activeValidation.reason}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

