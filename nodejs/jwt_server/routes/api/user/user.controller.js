const User = require("../../../models/user");

/* 
    GET /api/user/list
*/

exports.list = (request, response) => {
  // refuse if not an admin
  if (!request.decoded.admin) {
    return response.status(403).json({
      message: "you are not an admin",
    });
  }

  User.find({}).then((users) => response.json({ users }));
};

/*
    POST /api/user/assign-admin/:username
*/

exports.assignAdmin = (request, response) => {
  // refuse if not an admin
  if (!request.decoded.admin) {
    return response.status(403).json({
      message: "you are not an admin",
    });
  }
  console.log("ur admin");

  User.findOneByUsername(request.params.username)
    .then((user) => user.assignAdmin)
    .then(response.json({ success: true }));
};
