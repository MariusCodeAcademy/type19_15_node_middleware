const express = require('express');

const authRouter = express.Router();

// login route
// POST - username ir password - send 200 response if user found
// 400 - user not found
authRouter.post('/api/auth/login', async (req, res) => {
  // issitraukiam atsiustu duomenis

  // paieskoti vartotojo duomenu bazej pagal username

  // radom

  // arr sutampa slaptazodis?

  // jei sutampa sekme
  res.json('trying login');
});

module.exports = authRouter;
