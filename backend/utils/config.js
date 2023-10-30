const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'mesto-secret-key';

module.exports = {
  SECRET_KEY,
};
