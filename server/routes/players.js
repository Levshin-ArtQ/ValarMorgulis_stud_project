// server/routes/players.js
const express = require('express');
const { Player, Item, Task } = require('../models');
const router = express.Router();

// Получение списка всех игроков
router.get('/', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Получение игрока по ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Создание нового игрока
// router.post('/', async (req, res) => {
//   try {
//     const player = await Player.create(req.body);
//     res.status(201).json(player);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// Обновление игрока по ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Player.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const player = await Player.findByPk(req.params.id);
      res.json(player);
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Удаление игрока по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Player.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send('Player deleted');
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Получение списка предметов игрока по его ID

// Получение списка предметов игрока по его ID
router.get('/:id/items', async (req, res) => {
  console.log('user id: ', req.params.id, 'items requested');
  try {
    const items = await Player.findByPk(req.params.id, { include: [Item] });
    if (items) {
      res.json(items.Items);
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id/tasks', async (req, res) => {
  console.log('user id: ', req.params.id, 'tasks requested');
  try {
    const tasks = await Player.findByPk(req.params.id, { include: [Task] });
    if (tasks) {
      res.json(tasks.Tasks);
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message);
  }
});

module.exports = router;


