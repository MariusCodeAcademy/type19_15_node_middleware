const express = require('express');
const { dbQueryWithData } = require('../helper');

const authRouter = express.Router();

// login route
// POST - username ir password - send 200 response if user found
// 400 - user not found
authRouter.post('/api/auth/login', async (req, res) => {
  // issitraukiam atsiustu duomenis
  const { username, password } = req.body;
  // paieskoti vartotojo duomenu bazej pagal username
  const sql = 'SELECT * FROM `users` WHERE username=?';
  const [rows, error] = await dbQueryWithData(sql, [username]);

  console.log('error ===', error);
  // neradom
  if (rows.length === 0) {
    res.status(400).json({
      msg: 'username not fount (dev)',
    });
    return;
  }
  // radom
  if (rows.length === 1) {
    // arr sutampa slaptazodis?
    if (password !== rows[0].password) {
      res.status(400).json({
        msg: 'username or password not match (dev pass no match)',
      });
      return;
    }
    // pass match
    res.json({
      msg: 'loging success',
    });
  }
});

module.exports = authRouter;
