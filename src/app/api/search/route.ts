import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';
import { API_ENDPOINTS } from '@/app/constant/apiConstants';

export async function GET(req: Request) {
  return handleTourApiRequest(req, {
    endpoint: API_ENDPOINTS.SEARCH,
    requiredParams: ['keyword'],
    validations: [commonValidations.lDongSignguCd],
  });
}