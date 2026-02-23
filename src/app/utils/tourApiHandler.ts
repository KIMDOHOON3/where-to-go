// app/utils/tourApiHandler.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { API_CONFIG } from '@/app/constant/apiConstants';
import { logError } from '@/app/utils/errorHandler';

interface ValidationRule {
  condition: (params: Record<string, string>) => boolean;
  message: string;
}

interface TourApiConfig {
  endpoint: string;
  validations?: ValidationRule[];
  requiredParams?: string[];
}

/**
 * 공통 Tour API 핸들러
 */
export async function handleTourApiRequest(
  req: Request,
  config: TourApiConfig
): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  // 빈 값과 '_' 파라미터 필터링
  const params = Object.fromEntries(
    [...searchParams.entries()].filter(([key, value]) => value !== '' && key !== '_')
  );

  // 필수 파라미터 검증
  if (config.requiredParams) {
    for (const required of config.requiredParams) {
      if (!params[required]) {
        return NextResponse.json({ message: `${required} is required` }, { status: 400 });
      }
    }
  }

  // 커스텀 검증 규칙
  if (config.validations) {
    for (const rule of config.validations) {
      if (rule.condition(params)) {
        return NextResponse.json({ message: rule.message }, { status: 400 });
      }
    }
  }

  // Service Key 확인
  const serviceKey = API_CONFIG.SERVICE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ message: 'Service key not configured' }, { status: 500 });
  }

  const decodedServiceKey = decodeURIComponent(serviceKey);
  const apiUrl = `${API_CONFIG.BASE_URL}/${config.endpoint}`;

  const apiParams = {
    ...params,
    serviceKey: decodedServiceKey,
    ...API_CONFIG.DEFAULT_PARAMS,
  };

  try {
    const response = await axios.get(apiUrl, {
      params: apiParams,
      timeout: 10000,
    });
    
    // 공공데이터 API 에러 체크
    const resultCode = response.data?.response?.header?.resultCode;
    const resultMsg = response.data?.response?.header?.resultMsg;
    

    if (resultCode && resultCode !== '0000') {
      console.error('❌ [TourAPI] API returned error:', {
        code: resultCode,
        message: resultMsg,
        fullHeader: response.data?.response?.header
      });
      
      return NextResponse.json(
        {
          message: 'API Error',
          code: resultCode,
          detail: resultMsg,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
    
  } catch (error: unknown) {
    logError(`TourAPI - ${config.endpoint}`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error;

      // 네트워크 에러 (응답 없음)
      if (!axiosError.response) {
        const isTimeout = axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout');
        return NextResponse.json(
          {
            message: isTimeout ? 'Request timeout' : 'Network error',
            detail: isTimeout
              ? '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.'
              : '인터넷 연결을 확인해주세요.',
          },
          { status: 503 }
        );
      }

      // HTTP 상태 코드별 처리
      const status = axiosError.response.status;
      let message = 'API Error';
      let detail = '데이터를 불러오는 중 오류가 발생했습니다.';

      if (status === 429) {
        message = 'Rate limit exceeded';
        detail = 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
      } else if (status >= 500) {
        message = 'Server error';
        detail = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (status === 404) {
        message = 'Not found';
        detail = '요청하신 데이터를 찾을 수 없습니다.';
      } else if (status === 400) {
        message = 'Bad request';
        detail = '잘못된 요청입니다.';
      }

      return NextResponse.json(
        {
          message,
          detail,
          status,
        },
        { status: status >= 500 ? status : 500 }
      );
    }

    // 일반 에러
    return NextResponse.json(
      {
        message: 'Unknown error',
        detail: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}

// 공통 검증 규칙들
export const commonValidations = {
  lDongSignguCd: {
    condition: (params: Record<string, string>) => !!params.lDongSignguCd && !params.lDongRegnCd,
    message: 'lDongRegnCd is required when lDongSignguCd is provided',
  },
};