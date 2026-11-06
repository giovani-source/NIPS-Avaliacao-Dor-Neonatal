import {
  NIPS_CUTOFF_SCORE,
  NIPS_INDICATORS,
  NIPS_MAX_SCORE,
  NIPS_MIN_SCORE,
  type NipsIndicatorId,
  type NipsResponses,
  type Profession,
} from '../data/nipsScale';

export type NipsClassification = 'abaixo_corte' | 'sugestivo_dor';

export interface IndicatorSummaryItem {
  indicatorId: NipsIndicatorId;
  stepNumber: number;
  title: string;
  selectedLabel: string;
  selectedDescription: string;
  score: number;
  maxScore: number;
}

export interface NipsEvaluationResult {
  totalScore: number;
  maxPossibleScore: typeof NIPS_MAX_SCORE;
  cutoffScore: typeof NIPS_CUTOFF_SCORE;
  isSuggestiveOfPain: boolean;
  classification: NipsClassification;
  interpretationTitle: string;
  interpretationMessage: string;
  protocolDisclaimer: string;
  reassessmentGuidance: string;
  breakdown: IndicatorSummaryItem[];
  profession: Profession | null;
}

/**
 * Valida se todas as 6 questões da escala NIPS foram respondidas com valores válidos.
 */
export function areAllIndicatorsAnswered(responses: NipsResponses): boolean {
  if (!responses || typeof responses !== 'object') {
    return false;
  }

  for (const indicator of NIPS_INDICATORS) {
    const value = responses[indicator.id];
    if (typeof value !== 'number' || Number.isNaN(value) || !Number.isInteger(value)) {
      return false;
    }
    const validScores = indicator.options.map((opt) => opt.score as number);
    if (!validScores.includes(value)) {
      return false;
    }
  }

  return true;
}

/**
 * Função pura para cálculo do escore NIPS (0 a 7).
 * A profissão é registrada apenas para contexto de sessão e não influencia a pontuação.
 */
export function calculateNipsScore(
  responses: NipsResponses,
  profession: Profession | null = null
): NipsEvaluationResult {
  if (!areAllIndicatorsAnswered(responses)) {
    throw new Error(
      'Todas as seis questões da escala NIPS devem ser respondidas com valores válidos antes de calcular o escore.'
    );
  }

  const breakdown: IndicatorSummaryItem[] = NIPS_INDICATORS.map((indicator) => {
    const rawScore = responses[indicator.id]!;
    const matchedOption = indicator.options.find((opt) => opt.score === rawScore);

    if (!matchedOption) {
      throw new Error(`Valor inválido (${rawScore}) para o indicador ${indicator.shortTitle}.`);
    }

    return {
      indicatorId: indicator.id,
      stepNumber: indicator.stepNumber,
      title: indicator.shortTitle,
      selectedLabel: matchedOption.label,
      selectedDescription: matchedOption.description,
      score: matchedOption.score,
      maxScore: indicator.maxScore,
    };
  });

  const totalScore =
    breakdown.reduce((acc, item) => acc + item.score, 0);

  if (
    Number.isNaN(totalScore) ||
    !Number.isFinite(totalScore) ||
    totalScore < NIPS_MIN_SCORE ||
    totalScore > NIPS_MAX_SCORE
  ) {
    throw new Error(`Pontuação total inválida calculada: ${totalScore}`);
  }

  const isSuggestiveOfPain = totalScore >= NIPS_CUTOFF_SCORE;
  const classification: NipsClassification = isSuggestiveOfPain
    ? 'sugestivo_dor'
    : 'abaixo_corte';

  const interpretationTitle = isSuggestiveOfPain
    ? 'Pontuação sugestiva de presença de dor'
    : 'Pontuação abaixo do ponto de corte configurado';

  const interpretationMessage = isSuggestiveOfPain
    ? 'Pontuação sugestiva de presença de dor, exigindo avaliação clínica e medidas de alívio conforme protocolo institucional.'
    : 'Resultado abaixo do ponto de corte de 4 pontos utilizado neste aplicativo. Este resultado não exclui dor e a avaliação clínica permanece necessária.';

  const protocolDisclaimer =
    'A interpretação configurada utiliza ponto de corte ≥4 e deve ser confirmada pelo protocolo institucional.';

  const reassessmentGuidance =
    'Correlacione o escore com o contexto clínico, procedimentos realizados e sinais fisiológicos. Realize reavaliação periódica conforme o protocolo da unidade neonatal.';

  return {
    totalScore,
    maxPossibleScore: NIPS_MAX_SCORE,
    cutoffScore: NIPS_CUTOFF_SCORE,
    isSuggestiveOfPain,
    classification,
    interpretationTitle,
    interpretationMessage,
    protocolDisclaimer,
    reassessmentGuidance,
    breakdown,
    profession,
  };
}

/**
 * Formata o resumo textual estruturado para cópia/impressão, sem dados identificáveis de pacientes.
 */
export function formatClinicalSummaryText(
  result: NipsEvaluationResult,
  evaluatedAtFormatted: string
): string {
  const lines: string[] = [
    'NIPS — AVALIAÇÃO DA DOR NEONATAL',
    '========================================',
    `Data e horário: ${evaluatedAtFormatted}`,
    `Profissional avaliador: ${result.profession ?? 'Não informado'}`,
    '',
    `ESCORE TOTAL: ${result.totalScore} / ${result.maxPossibleScore} pontos`,
    `INTERPRETAÇÃO: ${result.interpretationMessage}`,
    '',
    'INDICADORES AVALIADOS:',
    ...result.breakdown.map(
      (item) =>
        `${item.stepNumber}. ${item.title}: ${item.selectedLabel} (${item.score} pt${item.score === 1 ? '' : 's'})`
    ),
    '',
    'ORIENTAÇÃO CLÍNICA:',
    result.reassessmentGuidance,
    '',
    `Nota: ${result.protocolDisclaimer}`,
    'Registro anônimo — sem dados identificáveis de paciente.',
  ];

  return lines.join('\n');
}

