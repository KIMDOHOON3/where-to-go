import { NextRequest, NextResponse } from 'next/server';
import axios, { type AxiosResponse } from 'axios';

// 여러 개의 Tour API 상세 호출을 관리합니다

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const contentId = searchParams.get('contentId');
  const contentTypeId = searchParams.get('contentTypeId');
  const titleQuery = searchParams.get('title');

  if (!contentId) {
    return NextResponse.json({ error: 'contentId가 필요합니다' }, { status: 400 });
  }

  const serviceKey = process.env.TOUR_API_KEY;

  if (!serviceKey) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다' }, { status: 500 });
  }

  try {
    console.log('상세 정보 요청:', { contentId, contentTypeId });

    // decode service key (환경변수에 인코딩된 경우 대비)
    const decodedKey = decodeURIComponent(serviceKey);

    // detailCommon2: v2 공통 상세 정보 (제목, 주소, 이미지, 전화번호 등)
    // 여러 파라미터 중 일부가 특정 콘텐츠에 허용되지 않을 수 있어,
    // INVALID_REQUEST_PARAMETER_ERROR(코드 10)를 받으면 문구에서
    // 문제된 파라미터를 추출해 제거하고 재시도합니다.
    const commonParams: Record<string, string> = {
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
      serviceKey: decodedKey,
    };

    let commonResponse;
    let attempt = 0;
    const maxAttempts = 6;

    while (attempt < maxAttempts) {
      attempt += 1;
      try {
        console.log('detailCommon 호출 파라미터:', commonParams);
        commonResponse = await axios.get(
          'https://apis.data.go.kr/B551011/KorService2/detailCommon2',
          { params: commonParams }
        );
      } catch (err) {
        console.error('detailCommon 호출 네트워크 실패:', err);
        throw err;
      }

      const header = commonResponse.data?.response?.header;
      console.log(`detailCommon 응답 (${attempt}) 헤더:`, header);

      const resultCode = header?.resultCode;
      const resultMsg = header?.resultMsg;

      if (resultCode === '0000') {
        // 정상 응답
        break;
      }

      if (resultCode === '10' && resultMsg) {
        const match = resultMsg.match(/\(([^)]+)\)/);
        if (match) {
          const badParam = match[1];
          console.warn('잘못된 파라미터:', badParam, '제거하고 재시도');
          delete commonParams[badParam];
          continue;
        }
      }

      // 다른 에러는 반복 중단
      break;
    }

    if (!commonResponse) {
      throw new Error('detailCommon 호출 중 응답 누락');
    }

    console.log('detailCommon 전체 응답 샘플:', JSON.stringify(commonResponse.data).slice(0, 2000));

    console.log('detailCommon 응답 헤더:', commonResponse.data?.response?.header);

    let introResponse: AxiosResponse<any> | null = null; // any 필요: 외부 API 구조 미정

    // detailIntro2: 소개 정보 (콘텐츠 타입별 상세 정보)
    if (contentTypeId) {
      try {
        introResponse = await axios.get(
          'https://apis.data.go.kr/B551011/KorService2/detailIntro2',
          {
            params: {
              MobileOS: 'ETC',
              MobileApp: 'AppTest',
              _type: 'json',
              contentId,
              contentTypeId,
              serviceKey: decodedKey,
            },
          }
        );
        if (introResponse) {
          console.log('detailIntro 응답 헤더:', (introResponse.data as any)?.response?.header);
        }
      } catch (error) {
        console.error('detailIntro 호출 실패:', error);
      }
    }

    // 추가 세부 API: 이미지, 반복 정보, 같은 지역 추천 등
    let imageResponse: AxiosResponse<any> | null = null;
    let infoResponse: AxiosResponse<any> | null = null;
    let areaResponse: AxiosResponse<any> | null = null;

    // 비동기 병렬 호출
    const extraCalls: Promise<unknown>[] = [];

    extraCalls.push(
      axios
        .get('https://apis.data.go.kr/B551011/KorService2/detailImage1', {
          params: {
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            _type: 'json',
            contentId,
            serviceKey: decodedKey,
          },
        })
        .then((resp) => {
          imageResponse = resp;
        })
        .catch((e: unknown) => {
          console.error('detailImage 호출 실패:', e);
        })
    );

    extraCalls.push(
      axios
        .get('https://apis.data.go.kr/B551011/KorService2/detailInfo1', {
          params: {
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            _type: 'json',
            contentId,
            serviceKey: decodedKey,
          },
        })
        .then((resp) => {
          infoResponse = resp;
        })
        .catch((e: unknown) => {
          console.error('detailInfo 호출 실패:', e);
        })
    );

    // areaBasedList2 호출은 areacode가 있을 때만
    const areaCode = commonResponse.data?.response?.body?.items?.item?.areacode;
    if (areaCode) {
      extraCalls.push(
        axios
          .get('https://apis.data.go.kr/B551011/KorService2/areaBasedList2', {
            params: {
              MobileOS: 'ETC',
              MobileApp: 'AppTest',
              _type: 'json',
              areaCode,
              contentTypeId: contentTypeId || '',
              numOfRows: 5,
              pageNo: 1,
              listYN: 'Y',
              serviceKey: decodedKey,
            },
          })
          .then((resp) => {
            areaResponse = resp;
          })
          .catch((e: unknown) => {
            console.error('areaBasedList 호출 실패:', e);
          })
      );
    }

    // 모든 추가 호출이 끝날 때까지 대기
    await Promise.all(extraCalls);

    // 상세 정보가 없는 경우에도 백업 API를 시도
    const fallbackKeyword = titleQuery || contentId;

    let kakaoData: unknown = null;
    let wikiData: unknown = null;

    if (fallbackKeyword) {
      // Kakao Local Search
      const kakaoKey = process.env.KAKAO_API_KEY;
      if (kakaoKey) {
        try {
          const kakaoResp = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
              query: fallbackKeyword,
              size: 5,
            },
            headers: {
              Authorization: `KakaoAK ${kakaoKey}`,
            },
          });
          kakaoData = kakaoResp.data;
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error('Kakao 검색 실패:', e.response?.data || e.message);
          } else {
            console.error('Kakao 검색 실패:', e);
          }
        }
      }

      // Wikipedia 검색 (한국어 위키도 사용할 수 있음)
      try {
        const wikiResp = await axios.get('https://ko.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            list: 'search',
            srsearch: fallbackKeyword,
            format: 'json',
            origin: '*',
          },
        });
        wikiData = wikiResp.data;
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error('Wikipedia 검색 실패:', e.message);
        } else {
          console.error('Wikipedia 검색 실패:', e);
        }
      }
    }

    // 마지막 응답은 항상 200이며 부족 데이터와 보조 정보를 함께 반환
    const imagesData = (imageResponse as any)?.data || null;
    const infosData = (infoResponse as any)?.data || null;
    const nearbyData = (areaResponse as any)?.data || null;

    return NextResponse.json({
      common: commonResponse.data,
      intro: introResponse?.data || null,
      images: imagesData,
      infos: infosData,
      nearby: nearbyData,
      fallback: {
        keyword: fallbackKeyword,
        kakao: kakaoData,
        wiki: wikiData,
      },
    });
  } catch (error: unknown) {
    console.error('상세 정보 조회 실패:', error);
    if (axios.isAxiosError(error)) {
      console.error('API 에러 응답:', error.response?.data);
    }
    const details = axios.isAxiosError(error)
      ? typeof error.response?.data === 'object'
        ? error.response?.data
        : { raw: String(error.response?.data) }
      : { raw: String(error) };

    return NextResponse.json(
      {
        error: '상세 정보를 가져올 수 없습니다',
        details,
      },
      { status: 500 }
    );
  }
};
