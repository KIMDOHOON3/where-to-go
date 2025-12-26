// app/api/utils/tourApiHandler.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

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
  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return NextResponse.json({ message: 'Service key not configured' }, { status: 500 });
  }

  try {
    const response = await axios.get(
      `https://apis.data.go.kr/B551011/KorService2/${config.endpoint}`,
      {
        params: {
          ...params,
          serviceKey,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          _type: 'json',
        },
        timeout: 10000,
      }
    );

    // 공공데이터 API 에러 체크
    const resultCode = response.data?.response?.header?.resultCode;
    if (resultCode && resultCode !== '0000') {
      console.error('API Error:', response.data?.response?.header);
      return NextResponse.json(
        {
          message: 'API Error',
          code: resultCode,
          detail: response.data?.response?.header?.resultMsg,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', {
        endpoint: config.endpoint,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    return NextResponse.json({ message: 'Tour API Error' }, { status: 500 });
  }
}

// 공통 검증 규칙들
export const commonValidations = {
  lDongSignguCd: {
    condition: (params: Record<string, string>) => !!params.lDongSignguCd && !params.lDongRegnCd,
    message: 'lDongRegnCd is required when lDongSignguCd is provided',
  },
};
