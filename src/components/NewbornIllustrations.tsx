import React from 'react';
import type { IllustrationKey } from '../data/nipsScale';

interface IllustrationProps {
  type: IllustrationKey;
  isSelected?: boolean;
  className?: string;
}

/**
 * Ilustração principal da Tela de Boas-Vindas:
 * Recém-nascido envolto em manta macia, traço delicado e humanizado.
 */
export const WelcomeNewbornIllustration: React.FC<{ className?: string }> = ({
  className = 'w-36 h-36',
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Ilustração delicada de um recém-nascido sereno envolto em manta"
  >
    {/* Halo suave */}
    <circle cx="90" cy="90" r="78" fill="#E8F5F1" />
    <circle
      cx="90"
      cy="90"
      r="70"
      stroke="#3EB49E"
      strokeWidth="1.2"
      strokeDasharray="4 4"
      opacity="0.55"
    />

    {/* Manta neonatal (swaddle) */}
    <path
      d="M52 104C52 84 68 74 90 74C112 74 128 84 128 104C128 134 111 154 90 154C69 154 52 134 52 104Z"
      fill="#FFFFFF"
      stroke="#1B5E6B"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Dobras suaves da manta */}
    <path
      d="M60 100C73 112 96 116 121 102"
      stroke="#3EB49E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M66 122C82 129 102 127 116 116"
      stroke="#1B5E6B"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.65"
    />

    {/* Orelhas */}
    <circle cx="62" cy="64" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
    <circle cx="118" cy="64" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />

    {/* Cabeça do recém-nascido (mesmo bebê base de todas as telas) */}
    <circle
      cx="90"
      cy="62"
      r="27"
      fill="#FBF6F3"
      stroke="#1B5E6B"
      strokeWidth="2.4"
    />

    {/* Mecha delicada de cabelo */}
    <path
      d="M84 36C88 31 95 33 96 39C92 39 88 41 86 43"
      stroke="#1B5E6B"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Olhos fechados serenos */}
    <path
      d="M76 61C78.5 64 82.5 64 85 61"
      stroke="#1B5E6B"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M95 61C97.5 64 101.5 64 104 61"
      stroke="#1B5E6B"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Bochechas suaves */}
    <circle cx="74" cy="68" r="3.5" fill="#F4D5CD" opacity="0.7" />
    <circle cx="106" cy="68" r="3.5" fill="#F4D5CD" opacity="0.7" />

    {/* Nariz e boca tranquila */}
    <path
      d="M88.5 66C89.5 67 90.5 67 91.5 66"
      stroke="#1B5E6B"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M85 73C87.5 75.2 92.5 75.2 95 73"
      stroke="#1B5E6B"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Coração clínico discreto */}
    <path
      d="M90 137C90 137 81 131 81 125.5C81 122.5 83.4 120.5 86 120.5C87.8 120.5 89.2 121.5 90 122.8C90.8 121.5 92.2 120.5 94 120.5C96.6 120.5 99 122.5 99 125.5C99 131 90 137 90 137Z"
      fill="#DDF3EE"
      stroke="#2A8F7D"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Ícone clínico para Enfermeiro(a)
 */
export const NurseProfessionIcon: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="6" y="6" width="52" height="52" rx="16" fill="#E8F5F1" />
    {/* Coração com cruz de enfermagem / cuidado neonatal */}
    <path
      d="M32 48C32 48 16 38 16 26.5C16 21 20.2 17 25.5 17C28.6 17 31 18.6 32 20.8C33 18.6 35.4 17 38.5 17C43.8 17 48 21 48 26.5C48 38 32 48 32 48Z"
      fill="#FFFFFF"
      stroke="#1B5E6B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M32 25V35M27 30H37"
      stroke="#2A8F7D"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Ícone clínico para Médico(a)
 */
export const DoctorProfessionIcon: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="6" y="6" width="52" height="52" rx="16" fill="#E8F5F1" />
    {/* Estetoscópio clínico */}
    <path
      d="M22 17V26C22 31.5 26.5 36 32 36C37.5 36 42 31.5 42 26V17"
      stroke="#1B5E6B"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path d="M19 17H24M40 17H45" stroke="#2A8F7D" strokeWidth="2.6" strokeLinecap="round" />
    <path
      d="M32 36V42C32 45.9 35.1 49 39 49C42.9 49 46 45.9 46 42V37"
      stroke="#1B5E6B"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <circle cx="46" cy="34" r="4" fill="#FFFFFF" stroke="#2A8F7D" strokeWidth="2.4" />
  </svg>
);

/**
 * Ilustrações clínicas originais e consistentes do mesmo recém-nascido para cada opção dos 6 indicadores NIPS.
 */
export const NewbornIndicatorIllustration: React.FC<IllustrationProps> = ({
  type,
  isSelected = false,
  className = 'w-24 h-24',
}) => {
  const bgCircle = isSelected ? '#DDF3EE' : '#F1F6F5';

  switch (type) {
    // 1. EXPRESSÃO FACIAL — Normal / relaxada (0)
    case 'face-relaxed':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Orelhas */}
          <circle cx="26" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="94" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          {/* Cabeça do bebê */}
          <circle cx="60" cy="60" r="33" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.4" />
          {/* Mecha de cabelo */}
          <path d="M54 28C58 22 66 24 67 31C63 31 58 33 56 35" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Sobrancelhas suaves */}
          <path d="M43 49C46 47.5 50 47.5 53 49" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M67 49C70 47.5 74 47.5 77 49" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Olhos serenos fechados */}
          <path d="M43 57C46 60 50 60 53 57" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M67 57C70 60 74 60 77 57" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Bochechas */}
          <circle cx="42" cy="66" r="4" fill="#F4D5CD" opacity="0.7" />
          <circle cx="78" cy="66" r="4" fill="#F4D5CD" opacity="0.7" />
          {/* Nariz e lábios relaxados */}
          <path d="M58 64C59.5 65.5 60.5 65.5 62 64" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M53 74C56.5 77 63.5 77 67 74" stroke="#2A8F7D" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    // 1. EXPRESSÃO FACIAL — Contraída / franzida (1)
    case 'face-grimace':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          <circle cx="26" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="94" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="60" cy="60" r="33" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.4" />
          <path d="M54 28C58 22 66 24 67 31C63 31 58 33 56 35" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Linhas de tensão na testa (glabela franzida) */}
          <path d="M57 43V49M63 43V49" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" />
          {/* Sobrancelhas franzidas convergentes */}
          <path d="M41 47L54 52" stroke="#1B5E6B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M79 47L66 52" stroke="#1B5E6B" strokeWidth="2.4" strokeLinecap="round" />
          {/* Olhos apertados com pregas */}
          <path d="M43 57L53 56M45 60L53 56" stroke="#1B5E6B" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M77 57L67 56M75 60L67 56" stroke="#1B5E6B" strokeWidth="2.1" strokeLinecap="round" />
          {/* Sulco nasolabial acentuado */}
          <path d="M49 65C46 69 45 73 46 77" stroke="#D96B59" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M71 65C74 69 75 73 74 77" stroke="#D96B59" strokeWidth="1.8" strokeLinecap="round" />
          {/* Boca e queixo tensos */}
          <path d="M52 75C56 71.5 64 71.5 68 75" stroke="#1B5E6B" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M56 82C58 80.5 62 80.5 64 82" stroke="#D96B59" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // 2. CHORO — Ausente (0)
    case 'cry-absent':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          <circle cx="26" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="94" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="60" cy="60" r="32" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.4" />
          <path d="M54 29C58 23 66 25 67 32C63 32 58 34 56 36" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M44 56C47 59 51 59 54 56" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M66 56C69 59 73 59 76 56" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="43" cy="65" r="3.5" fill="#F4D5CD" opacity="0.7" />
          <circle cx="77" cy="65" r="3.5" fill="#F4D5CD" opacity="0.7" />
          {/* Boca fechada serena */}
          <path d="M54 73C57 75 63 75 66 73" stroke="#2A8F7D" strokeWidth="2.2" strokeLinecap="round" />
          {/* Indicador de silêncio suave */}
          <circle cx="92" cy="34" r="10" fill="#FFFFFF" stroke="#2A8F7D" strokeWidth="1.8" />
          <path d="M88 34H96" stroke="#2A8F7D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 2. CHORO — Resmungo (1)
    case 'cry-whimper':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          <circle cx="26" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="94" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="60" cy="60" r="32" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.4" />
          <path d="M54 29C58 23 66 25 67 32C63 32 58 34 56 36" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Sobrancelhas levemente inclinadas */}
          <path d="M43 49L53 51" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M77 49L67 51" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 57C47 59 51 59 54 57" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M66 57C69 59 73 59 76 57" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Boca semiaberta (gemido/resmungo) */}
          <ellipse cx="60" cy="74" rx="5.5" ry="3.8" fill="#F4D5CD" stroke="#1B5E6B" strokeWidth="2.2" />
          {/* Ondas sonoras curtas e intermitentes */}
          <path d="M90 42C93 45 93 50 90 53" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
          <path d="M96 39C100 44 100 51 96 56" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
        </svg>
      );

    // 2. CHORO — Vigoroso (2)
    case 'cry-vigorous':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          <circle cx="26" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="94" cy="62" r="6" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <circle cx="60" cy="60" r="32" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.4" />
          <path d="M54 29C58 23 66 25 67 32C63 32 58 34 56 36" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Sobrancelhas fortemente contraídas */}
          <path d="M41 47L54 52" stroke="#1B5E6B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M79 47L66 52" stroke="#1B5E6B" strokeWidth="2.4" strokeLinecap="round" />
          {/* Olhos fortemente fechados */}
          <path d="M43 56L53 58L44 61" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M77 56L67 58L76 61" stroke="#1B5E6B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Boca bem aberta em choro vigoroso */}
          <rect x="50" y="68" width="20" height="14" rx="7" fill="#E8998D" stroke="#1B5E6B" strokeWidth="2.3" />
          <path d="M55 80C57 77 63 77 65 80" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Ondas sonoras contínuas e intensas */}
          <path d="M92 38C96 43 96 51 92 56" stroke="#D96B59" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M98 34C104 41 104 53 98 60" stroke="#D96B59" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M28 38C24 43 24 51 28 56" stroke="#D96B59" strokeWidth="2.3" strokeLinecap="round" />
        </svg>
      );

    // 3. PADRÃO RESPIRATÓRIO — Normal / relaxada (0)
    case 'breathing-normal':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Cabeça do mesmo bebê */}
          <circle cx="60" cy="36" r="17" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <path d="M56 19C59 15 64 16 65 21" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 35C54 37 56 37 58 35" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M62 35C64 37 66 37 68 35" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Tórax do bebê */}
          <rect x="37" y="54" width="46" height="44" rx="18" fill="#FFFFFF" stroke="#1B5E6B" strokeWidth="2.3" />
          {/* Pulmões / expansão suave simétrica */}
          <path d="M56 62C49 63 45 69 45 76C45 81 49 84 56 83V62Z" fill="#DDF3EE" stroke="#2A8F7D" strokeWidth="1.8" />
          <path d="M64 62C71 63 75 69 75 76C75 81 71 84 64 83V62Z" fill="#DDF3EE" stroke="#2A8F7D" strokeWidth="1.8" />
          {/* Curva respiratória regular e suave */}
          <path
            d="M28 104C35 104 38 96 44 96C50 96 53 104 60 104C67 104 70 96 76 96C82 96 85 104 92 104"
            stroke="#2A8F7D"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );

    // 3. PADRÃO RESPIRATÓRIO — Alterada (1)
    case 'breathing-altered':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Cabeça do mesmo bebê */}
          <circle cx="60" cy="36" r="17" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <path d="M56 19C59 15 64 16 65 21" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M51 33L57 35M69 33L63 35" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Tórax com indicadores de esforço/irregularidade */}
          <rect x="37" y="54" width="46" height="44" rx="18" fill="#FFFFFF" stroke="#1B5E6B" strokeWidth="2.3" />
          <path d="M56 62C49 63 45 69 45 76C45 81 49 84 56 83V62Z" fill="#FDF1EF" stroke="#D96B59" strokeWidth="1.8" />
          <path d="M64 62C71 63 75 69 75 76C75 81 71 84 64 83V62Z" fill="#FDF1EF" stroke="#D96B59" strokeWidth="1.8" />
          {/* Setas discretas indicando tiragem/oscilação torácica */}
          <path d="M29 69L35 72L29 75" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M91 69L85 72L91 75" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Curva respiratória irregular, rápida e com pausa */}
          <path
            d="M24 104L31 93L37 106L43 91L49 105H64L71 92L77 106L84 95L95 104"
            stroke="#D96B59"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 4. BRAÇOS — Relaxados (0)
    case 'arms-relaxed':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Cabeça do bebê */}
          <circle cx="60" cy="34" r="16" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <path d="M56 18C59 14 64 15 65 20" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 34C54 36 56 36 58 34M62 34C64 36 66 36 68 34" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Tronco */}
          <rect x="42" y="51" width="36" height="46" rx="16" fill="#FFFFFF" stroke="#1B5E6B" strokeWidth="2.2" />
          {/* Braços suavemente repousados ao lado do tronco, mãos abertas/relaxadas */}
          <path
            d="M42 58C31 62 29 76 36 85"
            stroke="#2A8F7D"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M78 58C89 62 91 76 84 85"
            stroke="#2A8F7D"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <circle cx="37" cy="87" r="4.5" fill="#FBF6F3" stroke="#2A8F7D" strokeWidth="2" />
          <circle cx="83" cy="87" r="4.5" fill="#FBF6F3" stroke="#2A8F7D" strokeWidth="2" />
        </svg>
      );

    // 4. BRAÇOS — Flexionados ou estendidos / tensos (1)
    case 'arms-tense':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Cabeça do bebê */}
          <circle cx="60" cy="34" r="16" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.2" />
          <path d="M56 18C59 14 64 15 65 20" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M51 32L57 34M69 32L63 34" stroke="#1B5E6B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Tronco */}
          <rect x="42" y="51" width="36" height="46" rx="16" fill="#FFFFFF" stroke="#1B5E6B" strokeWidth="2.2" />
          {/* Braços rígidos/hiperflexionados ou estendidos com punhos cerrados */}
          <path
            d="M42 58L24 46L30 34"
            stroke="#D96B59"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M78 58L96 46L90 34"
            stroke="#D96B59"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Punhos cerrados */}
          <circle cx="30" cy="32" r="5" fill="#FBF6F3" stroke="#D96B59" strokeWidth="2.2" />
          <circle cx="90" cy="32" r="5" fill="#FBF6F3" stroke="#D96B59" strokeWidth="2.2" />
          {/* Traços de rigidez muscular */}
          <path d="M18 44L21 49M102 44L99 49" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 5. PERNAS — Relaxadas (0)
    case 'legs-relaxed':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Cabeça e tronco superiores discretos */}
          <circle cx="60" cy="26" r="12" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2" />
          <rect x="44" y="40" width="32" height="30" rx="12" fill="#FFFFFF" stroke="#1B5E6B" strokeWidth="2" />
          {/* Fralda neonatal */}
          <path d="M44 62H76L72 75H48L44 62Z" fill="#DDF3EE" stroke="#1B5E6B" strokeWidth="2" strokeLinejoin="round" />
          {/* Pernas em postura fisiológica relaxada (curvatura suave sem rigidez) */}
          <path
            d="M50 74C41 81 42 93 50 98"
            stroke="#2A8F7D"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M70 74C79 81 78 93 70 98"
            stroke="#2A8F7D"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <ellipse cx="52" cy="100" rx="5" ry="3.5" fill="#FBF6F3" stroke="#2A8F7D" strokeWidth="2" />
          <ellipse cx="68" cy="100" rx="5" ry="3.5" fill="#FBF6F3" stroke="#2A8F7D" strokeWidth="2" />
        </svg>
      );

    // 5. PERNAS — Flexionadas ou estendidas / rígidas (1)
    case 'legs-tense':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Cabeça e tronco */}
          <circle cx="60" cy="26" r="12" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2" />
          <rect x="44" y="40" width="32" height="30" rx="12" fill="#FFFFFF" stroke="#1B5E6B" strokeWidth="2" />
          <path d="M44 62H76L72 75H48L44 62Z" fill="#FDF1EF" stroke="#1B5E6B" strokeWidth="2" strokeLinejoin="round" />
          {/* Pernas tensas/estendidas rigidamente ou hiperflexionadas */}
          <path
            d="M49 74L38 101"
            stroke="#D96B59"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M71 74L82 101"
            stroke="#D96B59"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <ellipse cx="36" cy="103" rx="5.5" ry="3.5" fill="#FBF6F3" stroke="#D96B59" strokeWidth="2" />
          <ellipse cx="84" cy="103" rx="5.5" ry="3.5" fill="#FBF6F3" stroke="#D96B59" strokeWidth="2" />
          {/* Linhas indicando tensão muscular nos membros inferiores */}
          <path d="M31 86L35 90M89 86L85 90" stroke="#D96B59" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 6. ESTADO DE ALERTA — Dormindo / calmo (0)
    case 'alertness-calm':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Bebê tranquilo envolto em manta */}
          <path
            d="M36 82C36 69 46 62 60 62C74 62 84 69 84 82C84 96 74 104 60 104C46 104 36 96 36 82Z"
            fill="#FFFFFF"
            stroke="#1B5E6B"
            strokeWidth="2.2"
          />
          <circle cx="60" cy="48" r="22" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.3" />
          <path d="M55 26C58 22 64 23 65 28" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 47C50.5 49.5 53.5 49.5 56 47" stroke="#1B5E6B" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M64 47C66.5 49.5 69.5 49.5 72 47" stroke="#1B5E6B" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M55 57C58 59 62 59 65 57" stroke="#2A8F7D" strokeWidth="2" strokeLinecap="round" />
          {/* Símbolos discretos de repouso tranquilo */}
          <path
            d="M84 26H92L84 34H92"
            stroke="#2A8F7D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M94 18H99L94 23H99"
            stroke="#2A8F7D"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 6. ESTADO DE ALERTA — Desconfortável / irritado (1)
    case 'alertness-irritable':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill={bgCircle} />
          {/* Bebê inquieto / agitado */}
          <path
            d="M36 82C36 69 46 62 60 62C74 62 84 69 84 82C84 96 74 104 60 104C46 104 36 96 36 82Z"
            fill="#FFFFFF"
            stroke="#1B5E6B"
            strokeWidth="2.2"
          />
          <circle cx="60" cy="48" r="22" fill="#FBF6F3" stroke="#1B5E6B" strokeWidth="2.3" />
          <path d="M55 26C58 22 64 23 65 28" stroke="#1B5E6B" strokeWidth="2" strokeLinecap="round" />
          {/* Sobrancelhas tensas e expressão de inquietação */}
          <path d="M47 41L56 44M73 41L64 44" stroke="#1B5E6B" strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="52" cy="48" r="2.3" fill="#1B5E6B" />
          <circle cx="68" cy="48" r="2.3" fill="#1B5E6B" />
          <path d="M54 58C57 55 63 55 66 58" stroke="#D96B59" strokeWidth="2.2" strokeLinecap="round" />
          {/* Linhas de agitação / inquietação ao redor */}
          <path d="M25 46L31 48M27 56L33 55" stroke="#D96B59" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M95 46L89 48M93 56L87 55" stroke="#D96B59" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M31 74L25 78M89 74L95 78" stroke="#D96B59" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <div
          className={`${className} flex items-center justify-center rounded-full bg-[#E8F5F1] text-[#1B5E6B] text-xs font-medium`}
          aria-hidden="true"
        >
          NIPS
        </div>
      );
  }
};

