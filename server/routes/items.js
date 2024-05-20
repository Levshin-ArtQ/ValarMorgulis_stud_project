// server/routes/items.js
const jwt = require("jsonwebtoken");
const express = require('express');
const { Item, ItemType, Player } = require('../models');
const router = express.Router();

// Получение списка всех предметов
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll({ include: [ItemType, Player] });
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Получение предмета по ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, { include: [ItemType, Player] });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Создание нового предмета
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Обновление предмета по ID
router.put('/:id', async (req, res) => {
  try {
    // Extract token and item owner's ID from the request
    const token = req.headers.authorization;
    const ownerId = req.body.ownerId;

    // Verify token and check if the requester is the item owner
    const isOwner = await verifyTokenAndOwnership(token, ownerId, req.params.id);
    if (!isOwner) {
      console.log("Unauthorized: User does not own this item");
      return res.status(403).send('Unauthorized: You do not own this item');
    }

    // Proceed to update the item if the requester is verified as the owner
    const updated = await Item.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const item = await Item.findByPk(req.params.id);
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Helper function to verify token and check item ownership
async function verifyTokenAndOwnership(token, ownerId, itemId) {
  // Implement token verification logic and check if the ownerId matches the item owner's ID
  const decoded = await jwt.verify(token, "artq-secret-key")
  const item = await Item.findByPk(itemId);
  if (!item) {
    console.log("Item not found");
    return false;
  }
  console.log("User ID:", decoded.id, "Item owner ID:", item.owner);
  return decoded.id === item.owner && decoded.id === ownerId;
  // Return true if the user is the owner and the token is valid, otherwise return false
  // This is a placeholder and should be replaced with actual authentication logic
}

// Удаление предмета по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send('Item deleted');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;



// server/routes/messages.js
// Аналогично items.js, создайте маршруты для сообщений.
