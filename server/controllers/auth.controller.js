const db = require("../models");
const config = require("../config/auth.config");
const Player = db.Player;
const Item = db.Item;
const ItemType = db.ItemType;
const Task = db.Task;
const sampleProducts = [
  "Sword",
  "Shield",
  "Helmet",
  "Boots",
  "Potion"
];

const sampleDescriptions = [
  "A sturdy item forged by ancient craftsmen.",
  "Lightweight yet durable, perfect for any adventurer.",
  "Enchanted with mysterious powers.",
  "Crafted from rare materials, offers exceptional protection.",
  "Heals wounds and restores vitality."
];

// Function to create a random item
const createRandomItem = async (userId, itemTypeId) => {
  const randomIndex = Math.floor(Math.random() * sampleProducts.length);
  const item = await Item.create({
    name: sampleProducts[randomIndex],
    quality: Math.floor(Math.random() * 100),
    owner: userId,
    itemType: itemTypeId,
    description: sampleDescriptions[randomIndex],
  });
  console.log("Creating random item for user:", userId, "and item name:", item.name);
  return item;
  
};

const createTasks = async (userId) => {
  const tasks = await Task.create({
    owner: userId,
    description: "создайте новую задачу",
  })
};

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { where } = require("sequelize");

exports.signup = (req, res) => {
  console.log("Attempting to register user:", req.body.name);
  // Save User to Database
  Player.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      name: req.body.name,
      playerclass: req.body.playerclass,
      email: req.body.email,
      level: req.body.level,
      position: req.body.position,
      password: bcrypt.hashSync(req.body.password, 8),
    }
  })
  .then(async ([user, created]) => {
    if (!created) {
      console.log("User already exists:", user.name);
      return res.status(409).send({ message: "User already exists." });
    }
    console.log("User registered successfully:", user.name);
    try {
      const itemTypes = await ItemType.findAll();
      console.log("Item types:", itemTypes.map(it => it.name));

      // Assign a random item of each type to the user
      for (const itemType of itemTypes) {
        await createRandomItem(user.id, itemType.id);
      }
      await createTasks(user.id);
      res.send({ message: "User was registered successfully!" });
    } catch (err) {
      console.error("Failed to assign items to user:", err);
      res.status(500).send({ message: err.message });
    }
  })
  .catch((err) => {
    console.error("User registration failed:", err);
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  Player.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        name: req.body.name,
        playerclass: req.body.playerclass,
        email: req.body.email,
        level: req.body.level,
        position: req.body.position,
        accessToken: token,
      });
      console.log("successfully logged in");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
    
};
