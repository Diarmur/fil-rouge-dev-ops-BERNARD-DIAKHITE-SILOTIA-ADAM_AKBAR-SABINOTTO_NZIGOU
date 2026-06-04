const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/featured', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, excerpt, category, author, published_at
       FROM posts
       ORDER BY published_at DESC
       LIMIT 1`
    )
    res.json(rows[0] ?? null)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  const limit  = parseInt(req.query.limit)  || 10
  const offset = parseInt(req.query.offset) || 0
  try {
    const { rows } = await pool.query(
      `SELECT id, title, excerpt, category, author, published_at
       FROM posts
       ORDER BY published_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router