import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const contentId = searchParams.get('contentId');
  const contentTypeId = searchParams.get('contentTypeId');

  if (!contentId) {
    return NextResponse.json({ error: 'contentId가 필요합니다' }, { status: 400 });
  }

  const serviceKey = process.env.TOUR_API_KEY;

  if (!serviceKey) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다' }, { status: 500 });
  }

  try {
    console.log('상세 정보 요청:', { contentId, contentTypeId });

    // detailCommon: 공통 상세 정보 (제목, 주소, 이미지, 전화번호 등)
    const commonResponse = await axios.get(
      'https://apis.data.go.kr/B551011/KorService1/detailCommon1',
      {
        params: {
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          _type: 'json',
          contentId,
          defaultYN: 'Y',
          firstImageYN: 'Y',
          areacodeYN: 'Y',
          catcodeYN: 'Y',
          addrinfoYN: 'Y',
          mapinfoYN: 'Y',
          overviewYN: 'Y',
          serviceKey,
        },
      }
    );

    console.log('API 응답 상태:', commonResponse.data?.response?.header);

    let introResponse = null;

    // detailIntro: 소개 정보 (콘텐츠 타입별 상세 정보)
    if (contentTypeId) {
      try {
        introResponse = await axios.get(
          'https://apis.data.go.kr/B551011/KorService1/detailIntro1',
          {
            params: {
              MobileOS: 'ETC',
              MobileApp: 'AppTest',
              _type: 'json',
              contentId,
              contentTypeId,
              serviceKey,
            },
          }
        );
      } catch (error) {
        console.error('detailIntro 호출 실패:', error);
      }
    }

    return NextResponse.json({
      common: commonResponse.data,
      intro: introResponse?.data || null,
    });
  } catch (error) {
    console.error('상세 정보 조회 실패:', error);
    if (axios.isAxiosError(error)) {
      console.error('API 에러 응답:', error.response?.data);
    }
    return NextResponse.json(
      {
        error: '상세 정보를 가져올 수 없습니다',
        details: axios.isAxiosError(error) ? error.response?.data : String(error),
      },
      { status: 500 }
    );
  }
};
