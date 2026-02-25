import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';
import { API_ENDPOINTS } from '@/app/constant/apiConstants';

export const GET = async (req: Request) => {
  return handleTourApiRequest(req, {
    endpoint: API_ENDPOINTS.STAY,
    validations: [commonValidations.lDongSignguCd],
  });
};