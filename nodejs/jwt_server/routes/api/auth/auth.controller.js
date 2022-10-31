const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const user = require("../../../models/user");

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (request, response) => {
  const { username, password } = request.body;
  let newUser = null;

  // create a new user if doesn't exist
  const create = (user) => {
    console.log("create");
    if (user) {
      throw new Error("user exists");
    } else {
      return User.create(username, password);
    }
  };

  // count the number of the user
  const count = (user) => {
    console.log("count");
    newUser = user;
    return User.count({}).exec();
  };

  // assign admin of count is 1
  const assign = (count) => {
    console.log("assign");
    if (count === 1) {
      return newUser.assignAdmin();
    } else {
      return Promise.resolve(false);
    }
  };

  // response to the client
  const respond = (isAdmin) => {
    response.json({
      message: "registered successfully",
      admin: isAdmin ? true : false,
    });
  };

  // run if there is an error (username exist)
  const onError = (error) => {
    response.status(409).json({
      message: error.message,
    });
  };

  // check username duplication
  User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};
/*
    POST /api/auth/login
    {
        username,
        password
    }
*/
exports.login = (request, response) => {
  const { username, password } = request.body;
  const secret = request.app.get("jwt-secret");

  // check the user info & generate the jwt
  const check = (user) => {
    if (!user) {
      // user does not exist
      throw new Error("login failed:user not exist");
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username,
              admin: user.admin,
            },
            secret,
            {
              expiresIn: "7d",
              issuer: "developer.cheon",
              subject: "userInfo",
            },
            (error, token) => {
              if (error) reject(error);
              resolve(token);
            }
          );
        });
        return p;
      } else {
        throw new Error("login failed:invalid password");
      }
    }
  };

  // respond the token
  const respond = (token) => {
    response.json({
      message: "logined successfully",
      token,
    });
  };

  // an error occured
  const onError = (error) => {
    response.status(403).json({
      message: error.message,
    });
  };

  // find the user
  User.findOneByUsername(username).then(check).then(respond).catch(onError);
};

/*
    GET /api/auth/check
*/

exports.check = (request, response) => {
  response.json({
    success: true,
    info: request.decoded,
  });
};
