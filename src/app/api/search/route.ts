import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';

export async function GET(req: Request) {
  console.log('🔍 [Search API] Route called');
  return handleTourApiRequest(req, {
    endpoint: 'searchKeyword2',
    requiredParams: ['keyword'],
    validations: [commonValidations.lDongSignguCd],
  });
}