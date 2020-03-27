/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET || 'so much to learn to set up a database';
  if (authorization) {
      jwt.verify(authorization, secret, function(err, decodedToken) {
          if (err) {
              res.status(401).json({message: 'invalid token. You shall not pass!'})
          } else {
              req.token = decodedToken //so anything downstream can access the data in the token
              next();
          }
      })
  } else {
      res.status(401).json({you: 'shall not pass!', message: 'Please login and try again'})
  }
};
