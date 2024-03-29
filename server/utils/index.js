const validateEmail = (s) => {
  // this regex matches: anystring@anystring.anystring
  // without multiple `@` signs
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
};

module.exports = { validateEmail };
