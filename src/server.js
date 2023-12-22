require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { logHello, logBody } = require('./middleware');
const postsRouter = require('./routes/postsRouter');
const authRouter = require('./routes/authRouter');

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

app.use('/', postsRouter);
app.use('/', authRouter);

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
