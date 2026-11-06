import React, { useMemo, useState } from 'react';
import {
  NIPS_INDICATORS,
  type NipsIndicatorId,
  type NipsResponses,
  type Profession,
} from './data/nipsScale';
import {
  areAllIndicatorsAnswered,
  calculateNipsScore,
  formatClinicalSummaryText,
} from './utils/nipsCalculator';
import {
  DoctorProfessionIcon,
  NewbornIndicatorIllustration,
  NurseProfessionIcon,
  WelcomeNewbornIllustration,
} from './components/NewbornIllustrations';
import { QrCodeScreen } from './components/QrCodeModal';

type AppScreen =
  | 'welcome'
  | 'profession'
  | 'indicator'
  | 'result'
  | 'qrcode';

interface AppProps {
  configuredPublicUrl?: string;
}

export const App: React.FC<AppProps> = ({ configuredPublicUrl }) => {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [previousScreenBeforeQr, setPreviousScreenBeforeQr] =
    useState<AppScreen>('welcome');
  const [profession, setProfession] = useState<Profession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [responses, setResponses] = useState<NipsResponses>({});
  const [evaluatedAt, setEvaluatedAt] = useState<Date | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [showPwaGuide, setShowPwaGuide] = useState<boolean>(false);

  const currentIndicator = NIPS_INDICATORS[currentStepIndex];
  const currentSelection = currentIndicator
    ? responses[currentIndicator.id]
    : undefined;
  const isCurrentStepAnswered = typeof currentSelection === 'number';
  const isLastStep = currentStepIndex === NIPS_INDICATORS.length - 1;
  const allAnswered = useMemo(
    () => areAllIndicatorsAnswered(responses),
    [responses]
  );

  const evaluationResult = useMemo(() => {
    if (screen !== 'result' || !allAnswered) return null;
    try {
      return calculateNipsScore(responses, profession);
    } catch {
      return null;
    }
  }, [screen, allAnswered, responses, profession]);

  const formattedDateTime = useMemo(() => {
    const dateToFormat = evaluatedAt ?? new Date();
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(dateToFormat);
  }, [evaluatedAt]);

  // Navegação principal
  const handleStartEvaluation = () => {
    setScreen('profession');
  };

  const handleOpenQrCode = () => {
    setPreviousScreenBeforeQr(screen === 'qrcode' ? 'welcome' : screen);
    setScreen('qrcode');
  };

  const handleCloseQrCode = () => {
    setScreen(previousScreenBeforeQr);
  };

  const handleContinueFromProfession = () => {
    if (!profession) return;
    setCurrentStepIndex(0);
    setScreen('indicator');
  };

  const handleSelectOption = (indicatorId: NipsIndicatorId, score: number) => {
    setResponses((prev) => ({
      ...prev,
      [indicatorId]: score,
    }));
  };

  const handleNextIndicator = () => {
    if (!isCurrentStepAnswered) return;
    if (isLastStep) {
      if (areAllIndicatorsAnswered(responses)) {
        setEvaluatedAt(new Date());
        setScreen('result');
      }
    } else {
      setCurrentStepIndex((prev) => Math.min(prev + 1, NIPS_INDICATORS.length - 1));
    }
  };

  const handlePreviousIndicator = () => {
    if (currentStepIndex === 0) {
      setScreen('profession');
    } else {
      setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNewEvaluation = () => {
    setProfession(null);
    setResponses({});
    setCurrentStepIndex(0);
    setEvaluatedAt(null);
    setCopiedSummary(false);
    setScreen('welcome');
  };

  const handleReviewAnswers = () => {
    setCurrentStepIndex(0);
    setScreen('indicator');
  };

  const handleJumpToStep = (stepIdx: number) => {
    setCurrentStepIndex(stepIdx);
    setScreen('indicator');
  };

  const handleCopySummary = async () => {
    if (!evaluationResult) return;
    const summaryText = formatClinicalSummaryText(
      evaluationResult,
      formattedDateTime
    );
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback com textarea temporário
      const textarea = document.createElement('textarea');
      textarea.value = summaryText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  const handlePrintOrPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-dvh flex flex-col justify-between bg-[#F6F9F8] text-[#153238]">
      {/* Barra superior discreta */}
      <header className="w-full max-w-md mx-auto px-4 pt-4 pb-2 flex items-center justify-between no-print">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl bg-[#1B5E6B] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-2xs"
            aria-hidden="true"
          >
            NIPS
          </div>
          <span className="text-xs font-semibold text-[#39585F] tracking-tight">
            Escala de Dor Neonatal
          </span>
        </div>

        {screen !== 'qrcode' && (
          <button
            type="button"
            onClick={handleOpenQrCode}
            aria-label="Compartilhar acesso por QR code"
            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white border border-[#D5E3E0] text-xs font-semibold text-[#1B5E6B] hover:bg-[#EDF5F3] transition flex items-center gap-1.5"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <rect
                x="2.5"
                y="2.5"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <rect
                x="11.5"
                y="2.5"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <rect
                x="2.5"
                y="11.5"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M12 12H14.5V14.5M17.5 12V17.5H12M14.5 17.5V15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span>QR Code</span>
          </button>
        )}
      </header>

      {/* Conteúdo central */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-3 flex flex-col justify-center">
        {/* TELA 1 — BOAS-VINDAS */}
        {screen === 'welcome' && (
          <section
            aria-labelledby="welcome-title"
            className="bg-white rounded-3xl p-6 border border-[#DDE9E6] shadow-xs flex flex-col items-center text-center space-y-5"
          >
            <div className="pt-1">
              <WelcomeNewbornIllustration className="w-36 h-36 mx-auto" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5F1] text-[#1B5E6B] text-xs font-semibold tracking-wide">
                Neonatal Infant Pain Scale
              </span>
              <h1
                id="welcome-title"
                className="text-3xl font-extrabold tracking-tight text-[#153238]"
              >
                NIPS
              </h1>
              <p className="text-base font-semibold text-[#1B5E6B]">
                Avaliação da Dor Neonatal
              </p>
            </div>

            <p className="text-sm text-[#39585F] leading-relaxed max-w-xs">
              Avalie de forma estruturada seis parâmetros comportamentais e
              fisiológicos do recém-nascido por observação clínica direta à
              beira-leito.
            </p>

            <div className="w-full space-y-3 pt-1">
              <button
                type="button"
                onClick={handleStartEvaluation}
                className="w-full min-h-[56px] rounded-2xl bg-[#1B5E6B] text-white font-semibold text-base px-6 py-3.5 shadow-sm hover:bg-[#154B56] active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-[#1B5E6B] focus:ring-offset-2"
              >
                Iniciar avaliação
              </button>

              <button
                type="button"
                onClick={handleOpenQrCode}
                className="w-full min-h-[50px] rounded-2xl bg-[#EDF7F4] text-[#1B5E6B] font-semibold text-sm px-5 py-3 border border-[#CBE6DF] hover:bg-[#DDF3EE] active:scale-[0.99] transition"
              >
                Compartilhar acesso por QR code
              </button>
            </div>

            {/* Opção discreta de instalação PWA no iPhone / Safari */}
            <div className="w-full pt-2 border-t border-[#EDF3F1]">
              <button
                type="button"
                onClick={() => setShowPwaGuide((prev) => !prev)}
                className="text-xs font-medium text-[#39585F] hover:text-[#1B5E6B] underline underline-offset-4 py-1"
              >
                Como instalar na Tela de Início do iPhone (PWA)
              </button>
              {showPwaGuide && (
                <div className="mt-2.5 text-left rounded-2xl bg-[#F6F9F8] p-3.5 border border-[#DDE9E6] text-xs text-[#39585F] space-y-1.5">
                  <p className="font-semibold text-[#153238]">
                    Acesso rápido offline no Safari (iOS):
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>
                      Toque no botão <strong>Compartilhar</strong> na barra do
                      Safari.
                    </li>
                    <li>
                      Selecione <strong>Adicionar à Tela de Início</strong>.
                    </li>
                    <li>
                      Confirme em <strong>Adicionar</strong> para abrir como
                      aplicativo em tela cheia.
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TELA 2 — PERFIL PROFISSIONAL */}
        {screen === 'profession' && (
          <section
            aria-labelledby="profession-title"
            className="bg-white rounded-3xl p-6 border border-[#DDE9E6] shadow-xs flex flex-col space-y-5"
          >
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2A8F7D]">
                Identificação de Sessão
              </span>
              <h1
                id="profession-title"
                className="text-2xl font-bold text-[#153238]"
              >
                Qual é a sua profissão?
              </h1>
              <p className="text-sm text-[#39585F]">
                Selecione seu perfil de atuação na unidade neonatal. Esta
                informação é registrada apenas na sessão atual e não altera o
                escore NIPS.
              </p>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="profession-title"
              className="grid grid-cols-1 gap-3.5"
            >
              {(
                [
                  {
                    value: 'Enfermeiro(a)' as Profession,
                    subtitle: 'Assistência e vigilância de enfermagem neonatal',
                    Icon: NurseProfessionIcon,
                  },
                  {
                    value: 'Médico(a)' as Profession,
                    subtitle: 'Avaliação e conduta médica em neonatologia',
                    Icon: DoctorProfessionIcon,
                  },
                ] as const
              ).map(({ value, subtitle, Icon }) => {
                const selected = profession === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setProfession(value)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition flex items-center gap-4 min-h-[88px] focus:outline-none focus:ring-2 focus:ring-[#1B5E6B] ${
                      selected
                        ? 'border-[#1B5E6B] bg-[#EDF7F4] shadow-xs'
                        : 'border-[#DDE9E6] bg-white hover:border-[#A7C9C2]'
                    }`}
                  >
                    <Icon className="w-14 h-14 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-[#153238]">
                        {value}
                      </p>
                      <p className="text-xs text-[#39585F] mt-0.5 leading-snug">
                        {subtitle}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected
                          ? 'border-[#1B5E6B] bg-[#1B5E6B] text-white'
                          : 'border-[#B6CCC7] bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {selected && (
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M3.5 8.5L6.5 11.5L12.5 4.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setScreen('welcome')}
                className="min-h-[54px] px-5 rounded-2xl border border-[#CBDCD8] bg-white text-[#1B5E6B] font-semibold text-sm hover:bg-[#F3F8F7] transition"
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={!profession}
                onClick={handleContinueFromProfession}
                className="flex-1 min-h-[54px] rounded-2xl bg-[#1B5E6B] text-white font-semibold text-base px-6 hover:bg-[#154B56] disabled:bg-[#B8CBC8] disabled:text-white/80 disabled:cursor-not-allowed transition shadow-xs"
              >
                Continuar
              </button>
            </div>
          </section>
        )}

        {/* TELAS 3 A 8 — SEIS INDICADORES NIPS */}
        {screen === 'indicator' && currentIndicator && (
          <section
            aria-labelledby={`indicator-heading-${currentIndicator.id}`}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE9E6] shadow-xs flex flex-col space-y-4"
          >
            {/* Cabeçalho da etapa e barra de progresso */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#1B5E6B] uppercase tracking-wider">
                  Avaliação NIPS
                </span>
                <span
                  data-testid="step-progress-text"
                  className="text-[#39585F] bg-[#EDF7F4] px-2.5 py-1 rounded-full"
                >
                  Etapa {currentIndicator.stepNumber} de {NIPS_INDICATORS.length}
                </span>
              </div>

              <div
                role="progressbar"
                aria-label="Progresso da avaliação NIPS"
                aria-valuenow={currentIndicator.stepNumber}
                aria-valuemin={1}
                aria-valuemax={NIPS_INDICATORS.length}
                className="w-full h-2 rounded-full bg-[#E6F0EE] overflow-hidden"
              >
                <div
                  className="h-full bg-[#2A8F7D] rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (currentIndicator.stepNumber / NIPS_INDICATORS.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Título da pergunta e orientação de observação */}
            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-semibold text-[#2A8F7D]">
                Indicador {currentIndicator.stepNumber}:{' '}
                {currentIndicator.shortTitle}
              </p>
              <h1
                id={`indicator-heading-${currentIndicator.id}`}
                className="text-xl font-bold text-[#153238] leading-snug"
              >
                {currentIndicator.question}
              </h1>
              <p className="text-xs text-[#39585F] leading-relaxed">
                {currentIndicator.observationGuidance}
              </p>
            </div>

            {/* Opções de resposta em cartões visuais */}
            <div
              role="radiogroup"
              aria-labelledby={`indicator-heading-${currentIndicator.id}`}
              className="grid grid-cols-1 gap-3 pt-1"
            >
              {currentIndicator.options.map((option) => {
                const isSelected = currentSelection === option.score;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() =>
                      handleSelectOption(currentIndicator.id, option.score)
                    }
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition flex items-center gap-3.5 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#1B5E6B] ${
                      isSelected
                        ? 'border-[#1B5E6B] bg-[#EDF7F4] shadow-xs'
                        : 'border-[#DDE9E6] bg-white hover:border-[#A7C9C2]'
                    }`}
                  >
                    <NewbornIndicatorIllustration
                      type={option.illustration}
                      isSelected={isSelected}
                      className="w-20 h-20 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-bold text-[#153238]">
                          {option.label}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#1B5E6B] text-white'
                              : 'bg-[#F0F5F4] text-[#52737A]'
                          }`}
                        >
                          Valor {option.score}
                        </span>
                      </div>
                      <p className="text-xs text-[#39585F] mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#1B5E6B] bg-[#1B5E6B] text-white'
                          : 'border-[#B6CCC7] bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M3.5 8.5L6.5 11.5L12.5 4.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Nota clínica opcional (ex.: Choro em RN intubado) */}
            {currentIndicator.clinicalNote && (
              <div className="rounded-xl bg-[#F6F9F8] border border-[#DDE9E6] p-3 text-xs text-[#39585F] leading-relaxed">
                <strong className="text-[#1B5E6B]">Nota clínica: </strong>
                {currentIndicator.clinicalNote}
              </div>
            )}

            {/* Botões de navegação: Voltar e Próximo / Calcular escore NIPS */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePreviousIndicator}
                className="min-h-[54px] px-5 rounded-2xl border border-[#CBDCD8] bg-white text-[#1B5E6B] font-semibold text-sm hover:bg-[#F3F8F7] active:scale-[0.99] transition"
              >
                Voltar
              </button>

              <button
                type="button"
                disabled={!isCurrentStepAnswered}
                onClick={handleNextIndicator}
                className={`flex-1 min-h-[54px] rounded-2xl font-semibold text-base px-6 transition shadow-xs ${
                  isCurrentStepAnswered
                    ? 'bg-[#1B5E6B] text-white hover:bg-[#154B56] active:scale-[0.99]'
                    : 'bg-[#B8CBC8] text-white/80 cursor-not-allowed'
                }`}
              >
                {isLastStep ? 'Calcular escore NIPS' : 'Próximo'}
              </button>
            </div>
          </section>
        )}

        {/* TELA 9 — RESULTADO FINAL */}
        {screen === 'result' && evaluationResult && (
          <section
            aria-labelledby="result-title"
            className="bg-white rounded-3xl p-6 border border-[#DDE9E6] shadow-xs flex flex-col space-y-5 print-container"
          >
            {/* Cabeçalho do resultado */}
            <div className="text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2A8F7D]">
                Resultado da Avaliação Clínica
              </span>
              <h1
                id="result-title"
                className="text-xl font-bold text-[#153238]"
              >
                Escore NIPS Calculado
              </h1>
            </div>

            {/* Mostrador central grande */}
            <div
              className={`rounded-3xl p-6 text-center border-2 transition ${
                evaluationResult.isSuggestiveOfPain
                  ? 'bg-[#FDF1EF] border-[#E5B0A6]'
                  : 'bg-[#EDF7F4] border-[#B6E2D8]'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#39585F]">
                Pontuação Total
              </p>
              <p
                data-testid="total-score-display"
                className={`text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 ${
                  evaluationResult.isSuggestiveOfPain
                    ? 'text-[#A83828]'
                    : 'text-[#153238]'
                }`}
              >
                {evaluationResult.totalScore} / {evaluationResult.maxPossibleScore} pontos
              </p>

              <div className="mt-3 pt-3 border-t border-black/10">
                <p
                  data-testid="interpretation-title"
                  className={`text-sm font-bold ${
                    evaluationResult.isSuggestiveOfPain
                      ? 'text-[#9F3A2B]'
                      : 'text-[#1B5E6B]'
                  }`}
                >
                  {evaluationResult.interpretationTitle}
                </p>
                <p
                  data-testid="interpretation-message"
                  className="text-xs text-[#2B444A] mt-1 leading-relaxed"
                >
                  {evaluationResult.interpretationMessage}
                </p>
              </div>
            </div>

            {/* Nota discreta sobre o ponto de corte */}
            <p className="text-[11px] text-[#52737A] text-center leading-relaxed bg-[#F6F9F8] rounded-xl px-3 py-2 border border-[#E4EEEB]">
              {evaluationResult.protocolDisclaimer}
            </p>

            {/* Metadados da sessão (Profissão e Data/Hora local) */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="rounded-xl bg-[#F6F9F8] p-3 border border-[#E4EEEB]">
                <span className="text-[#52737A] block font-medium">
                  Profissional:
                </span>
                <strong
                  data-testid="result-profession"
                  className="text-[#153238] text-sm"
                >
                  {evaluationResult.profession ?? 'Não informado'}
                </strong>
              </div>
              <div className="rounded-xl bg-[#F6F9F8] p-3 border border-[#E4EEEB]">
                <span className="text-[#52737A] block font-medium">
                  Data e horário local:
                </span>
                <strong className="text-[#153238] text-sm">
                  {formattedDateTime}
                </strong>
              </div>
            </div>

            {/* Detalhamento dos 6 indicadores */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#39585F]">
                  Indicadores Avaliados (6/6)
                </h2>
                <span className="text-[11px] text-[#52737A] no-print">
                  Toque em um item para revisar
                </span>
              </div>

              <div className="divide-y divide-[#E8F0EE] rounded-2xl border border-[#DDE9E6] overflow-hidden bg-white">
                {evaluationResult.breakdown.map((item, idx) => (
                  <div
                    key={item.indicatorId}
                    className="p-3 flex items-center justify-between gap-3 text-xs hover:bg-[#F9FBFA] transition"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#153238]">
                        {item.stepNumber}. {item.title}
                      </p>
                      <p className="text-[#39585F] truncate">
                        {item.selectedLabel} — {item.selectedDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold ${
                          item.score > 0
                            ? 'bg-[#FDF1EF] text-[#9F3A2B]'
                            : 'bg-[#EDF7F4] text-[#1B5E6B]'
                        }`}
                      >
                        {item.score} pt{item.score === 1 ? '' : 's'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(idx)}
                        className="text-[11px] font-semibold text-[#1B5E6B] underline px-1 py-0.5 no-print"
                        aria-label={`Alterar resposta de ${item.title}`}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orientação clínica para avaliação e reavaliação */}
            <div className="rounded-2xl bg-[#F6F9F8] border border-[#DDE9E6] p-3.5 text-xs text-[#39585F] leading-relaxed">
              <strong className="text-[#153238] block mb-0.5">
                Orientação para avaliação e reavaliação:
              </strong>
              {evaluationResult.reassessmentGuidance}
            </div>

            {/* Ações da Tela de Resultado */}
            <div className="space-y-2.5 pt-1 no-print">
              <button
                type="button"
                onClick={handleNewEvaluation}
                className="w-full min-h-[54px] rounded-2xl bg-[#1B5E6B] text-white font-semibold text-base px-6 py-3 hover:bg-[#154B56] active:scale-[0.99] transition shadow-xs"
              >
                Nova avaliação
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleReviewAnswers}
                  className="min-h-[48px] rounded-xl bg-white border border-[#CBDCD8] text-[#1B5E6B] font-semibold text-sm px-3 py-2.5 hover:bg-[#F3F8F7] transition"
                >
                  Revisar respostas
                </button>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="min-h-[48px] rounded-xl bg-[#DDF3EE] text-[#153238] font-semibold text-sm px-3 py-2.5 hover:bg-[#CBEBE3] transition"
                >
                  {copiedSummary ? 'Resumo copiado!' : 'Copiar resumo'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handlePrintOrPdf}
                  className="min-h-[46px] rounded-xl bg-white border border-[#DDE9E6] text-[#39585F] font-semibold text-xs px-3 py-2 hover:bg-[#F6F9F8] transition"
                >
                  Imprimir / Salvar PDF
                </button>
                <button
                  type="button"
                  onClick={handleOpenQrCode}
                  className="min-h-[46px] rounded-xl bg-white border border-[#DDE9E6] text-[#1B5E6B] font-semibold text-xs px-3 py-2 hover:bg-[#F6F9F8] transition"
                >
                  Compartilhar com QR code
                </button>
              </div>
            </div>
          </section>
        )}

        {/* TELA 10 — QR CODE E ACESSO */}
        {screen === 'qrcode' && (
          <QrCodeScreen
            onClose={handleCloseQrCode}
            configuredPublicUrl={configuredPublicUrl}
          />
        )}
      </main>

      {/* Rodapé clínico */}
      <footer className="w-full max-w-md mx-auto px-4 py-4 text-center no-print">
        <p className="text-xs font-medium text-[#52737A]">
          Instrumento de apoio à avaliação clínica.
        </p>
        <p className="text-[11px] text-[#6E8B91] mt-0.5">
          Nenhum dado de paciente é armazenado ou transmitido.
        </p>
      </footer>
    </div>
  );
};

export default App;

