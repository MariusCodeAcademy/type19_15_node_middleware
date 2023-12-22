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

module.exports = {
  reqTime,
  logHello,
  logBody,
};
