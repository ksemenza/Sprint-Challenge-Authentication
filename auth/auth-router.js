const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.addUser(user)
      .then(saved => {
          const token = generateToken(user);
          res.status(201).json({user: saved, token: token})
      })
      .catch(err => {
          res.status(500).json({error: err, message: 'Failure to add user'})
      });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findUserByUsername(username)
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user); 
              res.status(200).json({message: 'Logged in successfully', token: token, user: user})
          } else {
              res.status(401).json({message: 'Invalid credentials. You shall not pass!'})
          }
      })
      .catch(err => {
          res.status(500).json({error: err, message: 'Failure to log in'})
      });
});

function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username
  }
  const secret = process.env.JWT_SECRET || 'so much to learn to set up a database';
  const options = {
      expiresIn: '8h'
  }
  return jwt.sign(payload, secret, options);
}

module.exports = router;
