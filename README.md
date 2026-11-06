# NIPS — Avaliação da Dor Neonatal

Aplicação clínica progressiva (PWA) e pacote nativo iOS (**Xcode**) para avaliação estruturada dos seis indicadores da **Neonatal Infant Pain Scale (NIPS)** em unidades neonatais.

---

## Localização no SSD Externo

Todo o projeto, dependências e artefatos de compilação estão armazenados exclusivamente no seu SSD externo:

- **Pasta raiz do projeto:** `/Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal`
- **Projeto Xcode (iOS):** `/Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal/Xcode/NIPS.xcodeproj`

---

## 1. Como testar no Xcode (Simulador ou iPhone físico)

1. Abra o projeto no Xcode:
   ```bash
   open /Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal/Xcode/NIPS.xcodeproj
   ```
2. Na barra superior do Xcode, escolha o simulador desejado (ex.: **iPhone 17 Pro**, **iPhone 17**, **iPhone SE**) ou conecte seu iPhone físico via cabo/Wi-Fi.
3. Pressione **⌘R** (ou clique no botão **Run / Play**).
4. Caso faça alterações no código React/TypeScript (`src/`), sincronize o pacote web do Xcode executando:
   ```bash
   cd /Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal
   npm run ios:sync
   ```

---

## 2. Como executar e testar como PWA no navegador

```bash
cd /Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal

# Executar suíte de testes automatizados (Vitest)
npm test

# Iniciar servidor de desenvolvimento Vite
npm run dev

# Gerar build de produção PWA
npm run build
```

---

## 3. Implantação Pública HTTPS (Vercel ou Netlify) para QR Code no iPhone

Para que o recurso **Compartilhar aplicativo com QR code** gere automaticamente o QR code da URL pública HTTPS ao abrir o aplicativo:

### Opção A — Vercel
1. Importe a pasta `/Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal` na Vercel (ou execute `npx vercel --prod`).
2. O arquivo `vercel.json` já está configurado (`buildCommand: "npm run build"`, `outputDirectory: "dist"`).
3. Após a publicação em `https://seu-dominio.vercel.app`, o aplicativo detectará automaticamente a origem `https://` pública e exibirá o QR code pronto para leitura pela câmera de qualquer iPhone.

### Opção B — Netlify
1. Faça deploy da pasta `/Volumes/PortableSSD/NIPS_Avaliacao_Dor_Neonatal` no Netlify.
2. O arquivo `netlify.toml` já define `command = "npm run build"` e `publish = "dist"`.
3. Opcionalmente, defina a variável de ambiente `VITE_PUBLIC_APP_URL=https://seu-dominio.netlify.app` para pré-configurar a URL pública também no pacote iOS.

---

## 4. Referências Clínicas

- **Neonatal Infant Pain Scale (NIPS)** — Lawrence J, Alcock D, McGrath P, Kay J, MacMurray SB, Dulberg C. *The development of a tool to assess neonatal pain.* Neonatal Netw. 1993;12(6):59-66.
- NCBI Bookshelf — [Neonatal Infant Pain Scale (NIPS) Table](https://www.ncbi.nlm.nih.gov/books/NBK615330/table/ch14.tab4/)
- IFF / Fiocruz — [Atenção à Saúde do Recém-Nascido: Avaliação e Manejo da Dor](https://www.iff.fiocruz.br/pdf/modulo_dor2015.pdf)

