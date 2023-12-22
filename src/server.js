require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { dbQueryWithData } = require('./helper');
const { logHello, reqTime, logBody, validatePost } = require('./middleware');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware - app level
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(logHello);
app.use(logBody);

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

app.post('/api/posts', validatePost, async (req, res) => {
  // panaudoti dbQueryWithData kad sukurti nauja post
  // pasiimam atsiustas reiksmes
  const { title, author, date, body } = req.body;

  const sql = `INSERT INTO posts 
    (title, author, date, body) 
    VALUES (?,?,?,?)`;
  const [resulObj, error] = await dbQueryWithData(sql, [
    title,
    author,
    date,
    body,
  ]);

  console.log('error ===', error);

  res.json(resulObj);
});

app.put('/api/posts/:pId', validatePost, async (req, res) => {
  res.json('update post');
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
    console.log(error);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('testConnection failed, did you start XAMPP mate???');
    }
  } finally {
    if (conn) conn.end();
  }
}

// 404 - returns json
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
