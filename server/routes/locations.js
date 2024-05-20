// server/routes/locations.js
const express = require('express');
const { Location } = require('../models');
const router = express.Router();

// Получение списка всех локаций
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
    console.log("locations in db: ", locations.length);
    res.json(locations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Получение локации по ID
router.get('/:locationId', async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.locationId);
    if (location) {
      res.json(location);
    } else {
      res.status(404).send('Location not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Поиск локации по ID игрока
router.get('/player-location/:playerId', async (req, res) => {
  try {
    const locations = await Location.findAll({ where: { playerId: req.params.playerId } });
    res.json(locations);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// Создание новой локации
router.post('/', async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Обновление локации по ID
router.put('/:locationId', async (req, res) => {
  try {
    const updated = await Location.update(req.body, { where: { locationId: req.params.locationId } });
    if (updated) {
      const location = await Location.findByPk(req.params.locationId);
      res.json(location);
    } else {
      res.status(404).send('Location not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Удаление локации по ID
router.delete('/:locationId', async (req, res) => {
  try {
    const deleted = await Location.destroy({ where: { locationId: req.params.locationId } });
    if (deleted) {
      res.status(204).send('Location deleted');
    } else {
      res.status(404).send('Location not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = router;
