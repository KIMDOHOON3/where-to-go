const axios = require('axios');
const fs = require('fs');
let kakaoKey = '';
try {
  const env = fs.readFileSync('./.env.local', 'utf8');
  const match = env.match(/^KAKAO_API_KEY=(.*)$/m);
  if (match) kakaoKey = match[1].trim();
} catch (e) {}

async function search(keyword) {
  try {
    const resp = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      params: { query: keyword, size: 5 },
      headers: { Authorization: `KakaoAK ${kakaoKey}` },
    });
    console.log(JSON.stringify(resp.data, null, 2));
  } catch (e) {
    console.error('error', e.response?.data || e.message);
  }
}

search('담주 다미담예술구');
