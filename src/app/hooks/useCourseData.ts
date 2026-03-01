import { useQuery } from '@tanstack/react-query';
import { getCourseApi } from '@/app/api/getCourseApi';
import { CourseItem } from '@/app/types/ItemType';
import { TRAVEL_TYPES } from '@/app/constant/apiConstants';

type TravelType = (typeof TRAVEL_TYPES)[keyof typeof TRAVEL_TYPES];

export function useCourseData(
  selectedArea: string,
  numOfRows: number,
  pageNo: number,
  travelType?: TravelType
) {
  return useQuery<CourseItem[], Error>({
    queryKey: ['courseData', selectedArea, numOfRows, pageNo, travelType],
    queryFn: () =>
      getCourseApi({
        selectedArea,
        numOfRows,
        pageNo,
        travelType,
      }),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: true,
  });
}
