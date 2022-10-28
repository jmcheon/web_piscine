module.exports = {
  isOwner: function (request, response) {
    if (request.user) {
      return true;
    }
    return false;
  },
  statusUI: function (request, response) {
    let authStatusUI = `<a href="/auth/login">login</a> | 
      <a href="/auth/register">register</a> | 
      <a href="/auth/google">login with google</a>`;
    if (this.isOwner(request, response)) {
      authStatusUI = `${request.user.displayName} | <a href="/auth/logout">logout</a>`;
    }
    return authStatusUI;
  },
};
