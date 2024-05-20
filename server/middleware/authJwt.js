const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    const tokenAge = Date.now() - decoded.iat * 1000;
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;

    if (tokenAge > threeDaysInMilliseconds) {
      return res.status(401).send({
        message: "Token is more than three days old!",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
