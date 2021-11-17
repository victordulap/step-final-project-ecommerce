const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Please provide login and password');
  }

  if (username !== 'admin' || password !== 'adminstep') {
    throw new BadRequestError('Login or password incorrect');
  }

  const id = 1;

  const token = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
  console.log(req.body);

  res.status(200).json({ user: { id, username }, token });
};

module.exports = {
  login,
};
