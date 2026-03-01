import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface WeatherData {
  areaCode: string;
  date: string;
  hour: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
}

export interface TourWeatherResponse {
  current: WeatherData;
  forecast: WeatherData[];
  recommendation: string;
}

const getTourWeatherInfo = async (
  areaCode: string,
  contentTypeId?: string
): Promise<TourWeatherResponse> => {
  if (!areaCode) {
    return {
      current: {
        areaCode: '',
        date: '',
        hour: '',
        temperature: 0,
        condition: 'unknown',
        humidity: 0,
        windSpeed: 0,
        rainProbability: 0,
      },
      forecast: [],
      recommendation: '',
    };
  }

  try {
    const response = await axios.get('/api/tour-weather', {
      params: {
        areaCode,
        contentTypeId,
      },
      timeout: 10000,
    });

    return (
      response.data?.data || {
        current: {
          areaCode: '',
          date: '',
          hour: '',
          temperature: 0,
          condition: 'unknown',
          humidity: 0,
          windSpeed: 0,
          rainProbability: 0,
        },
        forecast: [],
        recommendation: '',
      }
    );
  } catch (error) {
    console.error('Tour Weather API 호출 실패:', error);
    return {
      current: {
        areaCode: '',
        date: '',
        hour: '',
        temperature: 0,
        condition: 'unknown',
        humidity: 0,
        windSpeed: 0,
        rainProbability: 0,
      },
      forecast: [],
      recommendation: '',
    };
  }
};

export const useTourWeather = (areaCode: string, contentTypeId?: string) => {
  return useQuery({
    queryKey: ['tourWeather', areaCode, contentTypeId],
    queryFn: () => getTourWeatherInfo(areaCode, contentTypeId),
    enabled: !!areaCode,
    staleTime: 1000 * 60 * 30, // 30분
  });
};
