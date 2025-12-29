import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';

export async function GET(req: Request) {
  return handleTourApiRequest(req, {
    endpoint: 'searchFestival2',
    validations: [commonValidations.lDongSignguCd],
  });
}