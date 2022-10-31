const jwt = require("jsonwebtoken");

const authMiddleware = (request, response, next) => {
  // read the token from header or uri
  const token = request.headers["x-access-token"] || request.query.token;

  if (!token) {
    return response.status(403).json({
      success: false,
      message: "not logged in",
    });
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, request.app.get("jwt-secret"), (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    response.status(403).json({
      success: false,
      message: error.message,
    });
  };

  // process the promise
  p.then((decoded) => {
    request.decoded = decoded;
    next();
  }).catch(onError);
};

module.exports = authMiddleware;
