const jwt = require('jsonwebtoken');

const jwtValidator = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      msge:"Your token is not valid"
    });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== 'Bearer' || !token){
    return res.status(401).json({
      msge:"Your token is not valid"
    });
  }

  const secretKey = process.env.SECRET_KEY;

  jwt.verify(token, secretKey, (err) => {
    if (err) {
      return res.status(401).json({
        msge:"Your token is not valid"
      });
    }
  });


  next();
}

module.exports = {
  jwtValidator
}