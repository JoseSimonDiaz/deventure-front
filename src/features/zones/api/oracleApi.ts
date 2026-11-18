import { requestApi } from '@/shared/api/httpClient';
import { dataResponse } from '@/shared/contracts/common';
import { oracleAnswerSchema, type OracleAnswer } from '@/shared/contracts/gameplay';

const oracleEnvelopeSchema = dataResponse(oracleAnswerSchema);

export async function askOracle(question: string): Promise<OracleAnswer> {
  const { data } = await requestApi('/api/assistant/oracle-questions', {
    method: 'POST',
    body: { question },
    responseSchema: oracleEnvelopeSchema,
  });
  return data;
}
