const jwt = require('jsonwebtoken');

const errorMiddleware = ( err, req, res, next ) => {
    console.log('Error capturado', err)
    res.status(500).json({ message: 'Internal server error' })
}

const jwtValidator = ( req, res, next ) => {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(401).json({
        message: "Your token is not valid"
      });
    }
  
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== 'Bearer' || !token){
      return res.status(401).json({
        message: "Your token is not valid"
      });
    }
  
    const secretKey = process.env.SECRET_KEY;
  
    jwt.verify(token, secretKey, ( err, decoded ) => {
      if (err) {
        // Manejar el error aquí
        console.error('Error verifying JWT:', err);
        return res.status(401).json({
          message: "Your token is not valid"
        });
      }
  
      // Decodificado correctamente, puedes hacer algo con la información decodificada si es necesario
      req.decoded = decoded;
      next();
    });
};

const adminValidator = (req, res, next) => {
    // Ejecutar jwtValidator para validar el token
    jwtValidator(req, res, (err) => {
        if (err) {
            // Manejar el error de la validación del token
            return res.status(401).json({
                message: "Your token is not valid"
            });
        }
  
        // Obtener la información decodificada del token
        const decodedInfo = req.decoded;
  
        // Verificar si el usuario tiene el rol de administrador
        if (decodedInfo?.userWhitoutPassword?.admin !== true) {
            return res.status(401).json({
                message: "The user is not an admin"
            });
        }
        // Si la validación del token y la verificación del rol son exitosas, pasar al siguiente middleware o ruta
        next();
    });
};

const superAdminValidator = ( req, res, next ) => {
    // Ejecutar jwtValidator para validar el token
    jwtValidator(req, res, (err) => {
        if (err) {
            // Manejar el error de la validación del token
            return res.status(401).json({
                message: "Your token is not valid"
            });
        }
  
        // Obtener la información decodificada del token
        const decodedInfo = req.decoded;
  
        // Verificar si el usuario tiene el rol de administrador
        if (decodedInfo?.userWhitoutPassword?.superAdmin !== true) {
            return res.status(401).json({
                message: "The user is not an superAdmin"
            });
        }
        // Si la validación del token y la verificación del rol son exitosas, pasar al siguiente middleware o ruta
        next();
    });
}
  
  

module.exports = {
    errorMiddleware,
    jwtValidator,
    adminValidator,
    superAdminValidator
}