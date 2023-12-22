require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { dbQueryWithData } = require('./helper');
const { logHello, reqTime, logBody } = require('./middleware');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware - app level
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(logHello);
// app.use(logBody);

app.get('/', (req, res) => {
  res.json('Hello World');
});

// sukurti postsRoutes.js
// get all posts      route level middleware
app.get('/api/posts', reqTime, async (req, res) => {
  const sql = 'SELECT * FROM posts';
  const [rows, error] = await dbQueryWithData(sql);

  console.log('error ===', error);

  res.json(rows);
});

app.post('/api/posts', logBody, async (req, res) => {
  // panaudoti dbQueryWithData kad sukurti nauja post
  res.json('create post');
});

// testConnection();
// connect
async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM posts LIMIT 1');
    console.log('Succesfuly connected to mysql');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
}

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
