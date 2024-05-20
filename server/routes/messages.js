const express = require('express');
const { Message, Player } = require('../models');
const router = express.Router();

// Получение списка всех сообщений
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({ include: [{ model: Player, as: 'Sender' }, { model: Player, as: 'Recipient' }] });
    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Получение сообщения по ID
router.get('/:messageId', async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId, { include: [{ model: Player, as: 'Sender' }, { model: Player, as: 'Recipient' }] });
    if (message) {
      res.json(message);
    } else {
      res.status(404).send('Message not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Создание нового сообщения
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Обновление сообщения по ID
router.put('/:messageId', async (req, res) => {
  try {
    const updated = await Message.update(req.body, { where: { messageId: req.params.messageId } });
    if (updated) {
      const message = await Message.findByPk(req.params.messageId);
      res.json(message);
    } else {
      res.status(404).send('Message not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Удаление сообщения по ID
router.delete('/:messageId', async (req, res) => {
  try {
    const deleted = await Message.destroy({ where: { messageId: req.params.messageId } });
    if (deleted) {
      res.status(204).send('Message deleted');
    } else {
      res.status(404).send('Message not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
