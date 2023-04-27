const authorization = (roles) => {
  return function (req, res, next) {
    const { role } = req.userLogged;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden You don’t have permission to access this resource' });
    }
  };
};

module.exports = authorization;
