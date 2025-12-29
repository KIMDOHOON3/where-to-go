import { handleTourApiRequest, commonValidations } from '@/app/utils/tourApiHandler';

export async function GET(req: Request) {
  console.log('🗺️ [TourList API] Route called');
  return handleTourApiRequest(req, {
    endpoint: 'areaBasedList2',
    validations: [commonValidations.lDongSignguCd],
  });
}