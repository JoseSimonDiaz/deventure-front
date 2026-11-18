import type { AdminChallenge } from '@/shared/contracts/admin';

const JSON_INDENT = 2;

export const NEW_CHALLENGE_TEMPLATE = {
  type: 'multiple_choice',
  language: 'pseudo',
  statement: '¿Cuál es la respuesta correcta?',
  payload: {
    options: [
      { id: 'a', text: 'Opción A' },
      { id: 'b', text: 'Opción B' },
    ],
  },
  solution: { correctOptionId: 'a' },
  explanation: 'Explicá por qué es correcta.',
  commonErrors: [{ pattern: '^b$', message: 'Mensaje para el error común' }],
  hints: ['Primera pista'],
};

export const NEW_ANSWER_TEMPLATE = { type: 'multiple_choice', optionId: 'a' };

export function toEditableChallenge(challenge: AdminChallenge) {
  return {
    type: challenge.type,
    language: challenge.language,
    statement: challenge.statement,
    payload: challenge.payload,
    solution: challenge.solution,
    explanation: challenge.explanation,
    commonErrors: challenge.commonErrors,
    hints: challenge.hints.map((hint) => hint.text),
  };
}

export const stringifyJson = (value: unknown) => JSON.stringify(value, null, JSON_INDENT);

export function parseJsonOrNull(jsonText: string): unknown {
  try {
    return JSON.parse(jsonText) as unknown;
  } catch (_parseError) {
    return null;
  }
}
