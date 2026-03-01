import { useQuery } from '@tanstack/react-query';
import { getPetTravelApi } from '@/app/api/getPetTravelApi';
import { PetTravelItem } from '@/app/types/ItemType';

export function usePetTravelData(
  selectedArea: string,
  numOfRows: number,
  pageNo: number
) {
  return useQuery<PetTravelItem[], Error>({
    queryKey: ['petTravelData', selectedArea, numOfRows, pageNo],
    queryFn: () => getPetTravelApi(selectedArea, numOfRows, pageNo),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: true,
  });
}
