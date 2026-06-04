const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itemsRouter = require('./routes/items');

const app = express();
const postsRouter = require('./routes/posts') // add this line

app.use('/api/items', itemsRouter)
app.use('/api/posts', postsRouter) // add this line
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/items', itemsRouter);

app.listen(3000, () => console.log('Server on :3000'));