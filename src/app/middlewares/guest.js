const { Provider } = require("../models");

module.exports = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user instanceof Provider) {
      return res.redirect("/app/dashboardProvider");
    }
    return res.redirect("/app/dashboard");
  }
  return next();
};
