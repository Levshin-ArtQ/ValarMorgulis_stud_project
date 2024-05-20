const db = require("../models");
const ROLES = db.ROLES;
const Player = db.Player;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  console.log(req.body);
  Player.findOne({
    where: {
      name: req.body.name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Пользователь с именем " + req.body.name + " уже существует!"
      });
      return;
    }

    // Email
    Player.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Этот email уже используется! Попробуйте войти под ним или зарегистрируйтесь под другой почтой"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;