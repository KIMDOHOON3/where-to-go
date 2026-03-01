import { NextResponse } from 'next/server';
import axios from 'axios';
import { logError } from '@/app/utils/errorHandler';

const DATALAB_BASE_URL = 'http://apis.data.go.kr/B551011/DataLabService';

/**
 * 관광빅데이터 정보서비스 API
 * 지역별 관광지 방문자 수 조회
 */
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const startYmd = searchParams.get('startYmd') || getDefaultStartDate();
  const endYmd = searchParams.get('endYmd') || getDefaultEndDate();
  const areaCode = searchParams.get('areaCode') || '';
  const numOfRows = searchParams.get('numOfRows') || '100';
  const pageNo = searchParams.get('pageNo') || '1';

  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return NextResponse.json({ message: 'Service key not configured' }, { status: 500 });
  }

  const decodedServiceKey = decodeURIComponent(serviceKey);

  const apiUrl = `${DATALAB_BASE_URL}/locgoRegnVisitrDDList`;

  const params: Record<string, string> = {
    serviceKey: decodedServiceKey,
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    startYmd,
    endYmd,
    numOfRows,
    pageNo,
  };

  if (areaCode) {
    params.areaCode = areaCode;
  }

  try {
    const response = await axios.get(apiUrl, {
      params,
      timeout: 15000,
    });

    const resultCode = response.data?.response?.header?.resultCode;
    const resultMsg = response.data?.response?.header?.resultMsg;

    if (resultCode && resultCode !== '0000') {
      // 데이터가 없는 경우 빈 배열 반환
      if (resultCode === '0010' || resultCode === '0020') {
        return NextResponse.json({
          response: {
            header: { resultCode: '0000', resultMsg: 'OK' },
            body: { items: { item: [] }, totalCount: 0 },
          },
        });
      }

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
    logError('VisitorStats API', error);

    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return NextResponse.json(
          {
            message: 'Network error',
            detail: '방문자 통계 데이터를 불러오는데 실패했습니다.',
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          message: 'API Error',
          detail: '방문자 통계 서비스에 오류가 발생했습니다.',
        },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Unknown error',
        detail: '알 수 없는 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
};

// 기본 시작일: 한 달 전
function getDefaultStartDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return formatDate(date);
}

// 기본 종료일: 어제
function getDefaultEndDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}
