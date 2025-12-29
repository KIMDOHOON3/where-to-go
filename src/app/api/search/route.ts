import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';

export async function GET(req: Request) {
  return handleTourApiRequest(req, {
    endpoint: 'searchKeyword2',
    requiredParams: ['keyword'],
    validations: [commonValidations.lDongSignguCd],
  });
}