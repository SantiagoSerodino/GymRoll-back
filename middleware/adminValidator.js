const jwt = require('jsonwebtoken');

const adminValidator = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ");
  const secretKey = process.env.SECRET_KEY

  data = jwt.verify(token, secretKey);

  if(data.role != 'admin'){
    return res.status(401).json({
      msge:"The user is not an admin"
    });
  }
  
  next();
}

module.exports = {
  adminValidator
}