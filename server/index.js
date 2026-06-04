const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'mini-blog-api' });
});

app.use('/api/posts', postsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mini-blog API running on port ${PORT}`);
});
