export type Profession = 'Enfermeiro(a)' | 'Médico(a)';

export type NipsIndicatorId =
  | 'expressaoFacial'
  | 'choro'
  | 'respiracao'
  | 'bracos'
  | 'pernas'
  | 'estadoAlerta';

export type IllustrationKey =
  | 'face-relaxed'
  | 'face-grimace'
  | 'cry-absent'
  | 'cry-whimper'
  | 'cry-vigorous'
  | 'breathing-normal'
  | 'breathing-altered'
  | 'arms-relaxed'
  | 'arms-tense'
  | 'legs-relaxed'
  | 'legs-tense'
  | 'alertness-calm'
  | 'alertness-irritable';

export interface NipsOption {
  id: string;
  label: string;
  description: string;
  score: 0 | 1 | 2;
  illustration: IllustrationKey;
}

export interface NipsIndicator {
  id: NipsIndicatorId;
  stepNumber: number;
  shortTitle: string;
  question: string;
  observationGuidance: string;
  clinicalNote?: string;
  maxScore: 1 | 2;
  options: NipsOption[];
}

export type NipsResponses = Partial<Record<NipsIndicatorId, number>>;

export type CompleteNipsResponses = Record<NipsIndicatorId, number>;

export const NIPS_INDICATORS: readonly NipsIndicator[] = [
  {
    id: 'expressaoFacial',
    stepNumber: 1,
    shortTitle: 'Expressão facial',
    question: 'Como está a expressão facial do recém-nascido?',
    observationGuidance:
      'Observe a face do recém-nascido por alguns segundos, avaliando a presença de tranquilidade ou tensão muscular facial.',
    maxScore: 1,
    options: [
      {
        id: 'expressao-0',
        label: 'Normal / relaxada',
        description: 'Face tranquila, sem tensão muscular.',
        score: 0,
        illustration: 'face-relaxed',
      },
      {
        id: 'expressao-1',
        label: 'Contraída / franzida',
        description: 'Sobrancelhas ou queixo tensos, careta facial.',
        score: 1,
        illustration: 'face-grimace',
      },
    ],
  },
  {
    id: 'choro',
    stepNumber: 2,
    shortTitle: 'Choro',
    question: 'Como está o choro do recém-nascido?',
    observationGuidance:
      'Observe a vocalização espontânea do recém-nascido, considerando frequência, timbre e continuidade.',
    clinicalNote:
      'Em recém-nascidos intubados, considerar manifestações faciais de choro silencioso conforme o protocolo utilizado.',
    maxScore: 2,
    options: [
      {
        id: 'choro-0',
        label: 'Ausente',
        description: 'Sem choro.',
        score: 0,
        illustration: 'cry-absent',
      },
      {
        id: 'choro-1',
        label: 'Resmungo',
        description: 'Gemidos leves ou choro baixo e intermitente.',
        score: 1,
        illustration: 'cry-whimper',
      },
      {
        id: 'choro-2',
        label: 'Vigoroso',
        description: 'Choro alto, intenso e contínuo.',
        score: 2,
        illustration: 'cry-vigorous',
      },
    ],
  },
  {
    id: 'respiracao',
    stepNumber: 3,
    shortTitle: 'Padrão respiratório',
    question: 'Como está a respiração do recém-nascido?',
    observationGuidance:
      'Observe o movimento do tórax e compare o ritmo atual ao padrão respiratório basal do recém-nascido.',
    maxScore: 1,
    options: [
      {
        id: 'respiracao-0',
        label: 'Normal / relaxada',
        description: 'Padrão respiratório habitual.',
        score: 0,
        illustration: 'breathing-normal',
      },
      {
        id: 'respiracao-1',
        label: 'Alterada',
        description:
          'Padrão diferente do basal, irregular, mais rápido, com suspiros ou pausas.',
        score: 1,
        illustration: 'breathing-altered',
      },
    ],
  },
  {
    id: 'bracos',
    stepNumber: 4,
    shortTitle: 'Braços',
    question: 'Como estão os braços do recém-nascido?',
    observationGuidance:
      'Observe a postura e o tônus muscular dos membros superiores em repouso ou movimento espontâneo.',
    maxScore: 1,
    options: [
      {
        id: 'bracos-0',
        label: 'Relaxados',
        description: 'Sem rigidez muscular.',
        score: 0,
        illustration: 'arms-relaxed',
      },
      {
        id: 'bracos-1',
        label: 'Flexionados ou estendidos',
        description: 'Tensos, rígidos ou agitados.',
        score: 1,
        illustration: 'arms-tense',
      },
    ],
  },
  {
    id: 'pernas',
    stepNumber: 5,
    shortTitle: 'Pernas',
    question: 'Como estão as pernas do recém-nascido?',
    observationGuidance:
      'Observe a postura e o tônus muscular dos membros inferiores, identificando relaxamento ou rigidez.',
    maxScore: 1,
    options: [
      {
        id: 'pernas-0',
        label: 'Relaxadas',
        description: 'Sem rigidez muscular.',
        score: 0,
        illustration: 'legs-relaxed',
      },
      {
        id: 'pernas-1',
        label: 'Flexionadas ou estendidas',
        description: 'Tensas ou rígidas.',
        score: 1,
        illustration: 'legs-tense',
      },
    ],
  },
  {
    id: 'estadoAlerta',
    stepNumber: 6,
    shortTitle: 'Estado de alerta',
    question: 'Como está o estado de alerta do recém-nascido?',
    observationGuidance:
      'Observe o estado comportamental global do recém-nascido durante a avaliação.',
    maxScore: 1,
    options: [
      {
        id: 'alerta-0',
        label: 'Dormindo / calmo',
        description: 'Tranquilo, adormecido ou acordado e sereno.',
        score: 0,
        illustration: 'alertness-calm',
      },
      {
        id: 'alerta-1',
        label: 'Desconfortável / irritado',
        description: 'Inquieto, agitado ou irritável.',
        score: 1,
        illustration: 'alertness-irritable',
      },
    ],
  },
] as const;

export const NIPS_MIN_SCORE = 0;
export const NIPS_MAX_SCORE = 7;
export const NIPS_CUTOFF_SCORE = 4;

