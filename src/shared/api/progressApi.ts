import { requestApi } from '@/shared/api/httpClient';
import { dataResponse } from '@/shared/contracts/common';
import { progressSummarySchema, type ProgressSummary } from '@/shared/contracts/progress';

const summaryResponseSchema = dataResponse(progressSummarySchema);

export async function fetchProgressSummary(): Promise<ProgressSummary> {
  const { data } = await requestApi('/api/progress/me/summary', {
    responseSchema: summaryResponseSchema,
  });
  return data;
}
