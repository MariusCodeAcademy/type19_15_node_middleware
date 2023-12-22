// my own middle ware
const logHello = (req, res, next) => {
  console.log('--- welcome to our server ---');
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

const logBody = (req, res, next) => {
  // patikrinti ar metodas yra POST, PUT, PATCH
  // console.log('req.method ===', req.method);
  // if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
  //   console.log('req.body ===', req.body);
  // }
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log('req.body ===', req.body);
  }
  // jei yra tai spausdinam body
  // jei ne nespausdinam

  // atspausdinti body
  // console.log('req.body ===', req.body);
  // leidzia kodui vykti toliau
  next();
};

const validatePost = (req, res, next) => {
  const {
    title, author, date, body,
  } = req.body;
  // validacija

  if (title?.trim() === '' || !title) {
    res.status(400).json({
      type: 'validation',
      error: 'required field',
      field: 'title',
    });
    return;
  }
  if (title?.trim().length < 3) {
    res.status(400).json({
      type: 'validation',
      error: 'must be 3 or more letters',
      field: 'title',
    });
    return;
  }
  if (author?.trim() === '' || !author) {
    res.status(400).json({
      type: 'validation',
      error: 'required field',
      field: 'author',
    });
    return;
  }
  // nera klaidu, vaziuojam tolyn
  next();
};

module.exports = {
  reqTime,
  logHello,
  logBody,
  validatePost,
};
