require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { dbQueryWithData } = require('./helper');

const app = express();

const PORT = process.env.PORT || 5000;

// my own middle ware
const logHello = (req, res, next) => {
  console.log('--- Hi there -- Im -- middleware!!!---');
  // leidzia kodui vykti toliau
  next();
};
const reqTime = (req, res, next) => {
  const now = new Date();
  const time = now.toTimeString();
  console.log('request:', time);
  // leidzia kodui vykti toliau
  next();
};

// Middleware - app level
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(logHello);
// app.use(reqTime);

app.get('/', (req, res) => {
  res.json('Hello World');
});

// get all posts      route level middleware
app.get('/api/posts', reqTime, async (req, res) => {
  const sql = 'SELECT * FROM posts';
  const [rows, error] = await dbQueryWithData(sql);

  console.log('error ===', error);

  res.json(rows);
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
