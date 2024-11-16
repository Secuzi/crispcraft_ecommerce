const isAdmin = (req, res, next) => {
  const { role } = req.session.user;

  if (req.session.user && role !== "admin") {
    return res.status(403).json({ message: "Forbidden action" });
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Please log in!" });
  }
  next();
};

module.exports = {
  isAdmin,
  isLoggedIn,
};
