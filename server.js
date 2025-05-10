const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const GAS_API_BASE = 'https://script.google.com/macros/s/AKfycbwFfRImQwQuVqVwRxb05Sl48ORZl3Puk4wt-77gGbdk8XZr5B0QGfSGMPrEYCNaMGoF/exec';

app.get('/proxy', async (req, res) => {
  const keyword = req.query.keyword;

  console.log(`[Proxy] keyword = ${keyword}`); // ユーザーからの入力ログ

  if (!keyword) {
    return res.status(400).send('Missing keyword');
  }

  try {
    const result = await axios.get(`${GAS_API_BASE}?keyword=${encodeURIComponent(keyword)}`);
    console.log('[Proxy] GAS response:', result.data); // GASの返り値ログ

    res.set('Content-Type', 'text/plain'); // レスポンス形式を明示
    res.send(result.data); // GASの返り値をそのままDifyに返す
  } catch (err) {
    console.error('[Proxy] Error:', err.message);
    res.status(500).send('Proxy error');
  }
});

// ✅ Renderが指定するポート番号を使う（重要）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
