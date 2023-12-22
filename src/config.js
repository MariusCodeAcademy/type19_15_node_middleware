const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

// console.log('dbConfig ===', dbConfig);

module.exports = {
  dbConfig,
};
