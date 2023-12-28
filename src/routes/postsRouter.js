const express = require('express');
const { reqTime, validatePost } = require('../middleware');
const { dbQueryWithData } = require('../helper');

const postsRouter = express.Router();

// routes

// sukurti postsRoutes.js
// get all posts      route level middleware
postsRouter.get('/api/posts', reqTime, async (req, res) => {
  const sql = 'SELECT * FROM posts ORDER BY post_id DESC';
  const [rows, error] = await dbQueryWithData(sql);

  console.log('error ===', error);
  if (error) {
    res.status(500).json({ error: 'something went wrong' });
  }

  res.json(rows);
});

postsRouter.post('/api/posts', validatePost, async (req, res) => {
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

  if (resulObj.affectedRows === 1) {
    res.status(201).json({ msg: 'post was created' });
    return;
  }
  res.json(resulObj);
});

postsRouter.put('/api/posts/:pId', validatePost, async (req, res) => {
  res.json('update post');
});

module.exports = postsRouter;
