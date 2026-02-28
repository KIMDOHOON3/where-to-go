import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const serviceKey = searchParams.get('serviceKey');
  const base_date = searchParams.get('base_date');
  const base_time = searchParams.get('base_time');
  const nx = searchParams.get('nx');
  const ny = searchParams.get('ny');

  if (!serviceKey) {
    return NextResponse.json({ error: 'API 키가 필요합니다' }, { status: 400 });
  }

  try {
    const response = await axios.get(
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
      {
        params: {
          serviceKey,
          pageNo: '1',
          numOfRows: '60',
          dataType: 'JSON',
          base_date,
          base_time,
          nx,
          ny,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('기상청 API 호출 실패:', error);
    return NextResponse.json({ error: '날씨 정보를 가져올 수 없습니다' }, { status: 500 });
  }
};
