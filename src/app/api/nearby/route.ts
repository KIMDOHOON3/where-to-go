import { NextRequest, NextResponse } from 'next/server';

interface SearchStayItem {
  contentid: number;
  contenttypeid: number;
  title: string;
  addr1: string;
  addr2?: string;
  firstimage?: string;
  firstimage2?: string;
  tel?: string;
  mapx?: string;
  mapy?: string;
}

interface SearchStayResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: SearchStayItem | SearchStayItem[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mapx = searchParams.get('mapx');
  const mapy = searchParams.get('mapy');
  const contentType = searchParams.get('contentType'); // '32' = 숙박, '39' = 음식점
  const numOfRows = searchParams.get('numOfRows') || '5';

  if (!mapx || !mapy || !contentType) {
    return NextResponse.json(
      { error: '필수 파라미터가 없습니다 (mapx, mapy, contentType)' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.TOUR_API_KEY;
    if (!apiKey) {
      throw new Error('TOUR_API_KEY is not configured');
    }

    // 공공데이터포털 검색 API 호출
    const url = new URL('http://apis.data.go.kr/B551011/KorService1/searchKeyword1');
    url.searchParams.append('serviceKey', apiKey);
    url.searchParams.append('mapX', mapx);
    url.searchParams.append('mapY', mapy);
    url.searchParams.append('radius', '1000'); // 반경 1km
    url.searchParams.append('contentTypeId', contentType);
    url.searchParams.append('numOfRows', numOfRows);
    url.searchParams.append('pageNo', '1');
    url.searchParams.append('listYN', 'Y');
    url.searchParams.append('sort', 'distance'); // 거리순 정렬
    url.searchParams.append('_type', 'json');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // 1시간 캐시
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: SearchStayResponse = await response.json();

    // 응답 데이터 정규화
    let items: SearchStayItem[] = [];
    if (data.response?.body?.items?.item) {
      items = Array.isArray(data.response.body.items.item)
        ? data.response.body.items.item
        : [data.response.body.items.item];
    }

    return NextResponse.json({
      items: items.map((item) => ({
        contentid: item.contentid,
        title: item.title,
        addr1: item.addr1,
        addr2: item.addr2,
        firstimage: item.firstimage || item.firstimage2,
        tel: item.tel,
        mapx: item.mapx,
        mapy: item.mapy,
      })),
      totalCount: data.response?.body?.totalCount || items.length,
    });
  } catch (error) {
    console.error('Nearby places API error:', error);
    return NextResponse.json({ error: '주변 정보를 불러올 수 없습니다' }, { status: 500 });
  }
}
