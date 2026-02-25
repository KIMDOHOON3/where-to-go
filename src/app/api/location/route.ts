import { handleTourApiRequest } from '@/app/utils/tourApiHandler';
import { API_ENDPOINTS } from '@/app/constant/apiConstants';

export const GET = async (req: Request) => {
  return handleTourApiRequest(req, {
    endpoint: API_ENDPOINTS.LOCATION_BASED,
    requiredParams: ['mapX', 'mapY', 'radius'],
  });
};