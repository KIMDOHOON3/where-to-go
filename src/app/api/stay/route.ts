import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';

export async function GET(req: Request) {
  console.log('🏨 [Stay API] Route called');
  return handleTourApiRequest(req, {
    endpoint: 'searchStay2',
    validations: [commonValidations.lDongSignguCd],
  });
}