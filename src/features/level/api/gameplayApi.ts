import { z } from 'zod';
import { requestApi } from '@/shared/api/httpClient';
import { dataResponse } from '@/shared/contracts/common';
import {
  assistantAnswerSchema,
  attemptResultSchema,
  gameSessionSchema,
  hintSchema,
  type Answer,
  type AssistantAnswer,
  type AttemptResult,
  type GameSession,
  type Hint,
} from '@/shared/contracts/gameplay';
import { seenTheorySchema } from '@/shared/contracts/progress';

const sessionEnvelopeSchema = dataResponse(gameSessionSchema);
const attemptEnvelopeSchema = dataResponse(attemptResultSchema);
const hintEnvelopeSchema = dataResponse(hintSchema);
const seenTheoryEnvelopeSchema = dataResponse(seenTheorySchema);
const assistantEnvelopeSchema = dataResponse(assistantAnswerSchema);
const emptyResponseSchema = z.unknown();

export type AttemptRequest = { sessionId: string; challengeId: string; answer: Answer };
export type HintRequest = { sessionId: string; challengeId: string };

export async function startSession(levelId: string): Promise<GameSession> {
  const { data } = await requestApi('/api/gameplay/sessions', {
    method: 'POST',
    body: { levelId },
    responseSchema: sessionEnvelopeSchema,
  });
  return data;
}

export async function submitAttempt({
  sessionId,
  challengeId,
  answer,
}: AttemptRequest): Promise<AttemptResult> {
  const { data } = await requestApi(`/api/gameplay/sessions/${sessionId}/attempts`, {
    method: 'POST',
    body: { challengeId, answer },
    responseSchema: attemptEnvelopeSchema,
  });
  return data;
}

export async function requestHint({ sessionId, challengeId }: HintRequest): Promise<Hint> {
  const { data } = await requestApi(`/api/gameplay/sessions/${sessionId}/hints`, {
    method: 'POST',
    body: { challengeId },
    responseSchema: hintEnvelopeSchema,
  });
  return data;
}

export type AssistantRequest = { sessionId: string; challengeId: string; question: string };

export async function askAssistant(request: AssistantRequest): Promise<AssistantAnswer> {
  const { data } = await requestApi('/api/assistant/hints', {
    method: 'POST',
    body: request,
    responseSchema: assistantEnvelopeSchema,
  });
  return data;
}

export async function abandonSession(sessionId: string): Promise<void> {
  await requestApi(`/api/gameplay/sessions/${sessionId}`, {
    method: 'PATCH',
    body: { status: 'abandoned' },
    responseSchema: emptyResponseSchema,
  });
}

export async function fetchSeenTheory(): Promise<string[]> {
  const { data } = await requestApi('/api/progress/me/theory-seen', {
    responseSchema: seenTheoryEnvelopeSchema,
  });
  return data.zoneIds;
}

export async function markTheorySeen(zoneId: string): Promise<void> {
  await requestApi('/api/progress/me/theory-seen', {
    method: 'POST',
    body: { zoneId },
    responseSchema: emptyResponseSchema,
  });
}
