// server/routes/tasks.js
const jwt = require("jsonwebtoken");
const express = require('express');
const { Task, Player } = require('../models');
const router = express.Router();

// Получение списка всех предметов
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: [ Player] });
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Получение предмета по ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [Player] });
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Создание нового предмета
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    
    const task = await Task.create({
      owner: req.body.id,
      description: req.body.description
    });
    
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.put('/:id/complete', async (req, res) => {
  try {
    const updated = await Task.update({ completed: true }, { where: { id: req.params.id } });
    if (updated) {
      const task = await Task.findByPk(req.params.id);
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.put('/:id/toggle', async (req, res) => {
  try {
    const updated = await Task.update({ completed: !req.body.completed }, { where: { id: req.params.id } });
    if (updated) {
      const task = await Task.findByPk(req.params.id);
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Обновление предмета по ID
router.put('/:id', async (req, res) => {
  try {
    // Extract token and task owner's ID from the request
    const token = req.headers.authorization;
    const ownerId = req.body.ownerId;

    // Verify token and check if the requester is the task owner
    const isOwner = await verifyTokenAndOwnership(token, ownerId, req.params.id);
    if (!isOwner) {
      console.log("Unauthorized: User does not own this task");
      return res.status(403).send('Unauthorized: You do not own this task');
    }

    // Proceed to update the task if the requester is verified as the owner
    const updated = await Task.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const task = await Task.findByPk(req.params.id);
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Helper function to verify token and check task ownership
async function verifyTokenAndOwnership(token, ownerId, taskId) {
  // Implement token verification logic and check if the ownerId matches the task owner's ID
  const decoded = await jwt.verify(token, "artq-secret-key")
  const task = await Task.findByPk(taskId);
  if (!task) {
    console.log("Task not found");
    return false;
  }
  console.log("User ID:", decoded.id, "Task owner ID:", task.owner);
  return decoded.id === task.owner;
  // Return true if the user is the owner and the token is valid, otherwise return false
  // This is a placeholder and should be replaced with actual authentication logic
}

// Удаление предмета по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send('Task deleted');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;



// server/routes/messages.js
// Аналогично tasks.js, создайте маршруты для сообщений.
