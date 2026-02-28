const fs = require('fs');
const axios = require('axios');

// manually load TOUR_API_KEY from .env.local
let decodedKey = '';
try {
  const env = fs.readFileSync('./.env.local', 'utf8');
  const match = env.match(/^TOUR_API_KEY=(.*)$/m);
  if (match) {
    decodedKey = decodeURIComponent(match[1].trim());
  }
} catch {}
(async () => {
  const contentId = '3579868';
  const decodedKey = decodeURIComponent(process.env.TOUR_API_KEY);

  async function call(params) {
    try {
      const r = await axios.get('https://apis.data.go.kr/B551011/KorService2/detailCommon2', {
        params,
      });
      console.log('params', params);
      console.log('status', r.data.response?.header);
      console.log('items', r.data.response?.body?.items?.item ? 'present' : 'none');
    } catch (e) {
      console.error('err', e.response?.data || e.message);
    }
  }

  const base = {
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

  console.log('---- full ----');
  await call(base);

  console.log('---- without addrinfo ----');
  {
    const p = { ...base };
    delete p.addrinfoYN;
    await call(p);
  }

  console.log('---- minimal ----');
  await call({
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    contentId,
    serviceKey: decodedKey,
  });
})();
