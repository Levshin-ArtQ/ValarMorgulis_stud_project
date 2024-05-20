const Reservation = require('../models/reservation');

exports.getReservations = (req, res, next) => {
    Reservation.findAll()
        .then(reservations => {
            res.status(200).json({ reservations: reservations });
        })
        .catch(err => console.log(err));
}

exports.getReservation = (req, res, next) => {
    const reservationId = req.params.reservationId;
    Reservation.findByPk(reservationId)
    .then(reservation => {
        if (!reservation) {
            return res.status(404).json({ message: 'Запись не найдена' });
        }
        res.status(200).json({ reservation: reservation });
    })
    .catch(err => console.log(err));
}

exports.createReservation = (req, res, next) => {
    Reservation.create({
        userId: req.body.userId, 
        place: req.body.place, 
        master: req.body.master, 
        serviceId: req.body.serviceId, 
        serviceName: req.body.serviceName, 
        chosenDTime: req.body.chosenDTime, 
        tgChat: req.body.tgChat, 
        note: req.body.note,
    })
      .then(result => {
        console.log('Created reservation');
        res.status(201).json({
          message: 'reservation created successfully!',
          reservation: result
        });
      })
      .catch(err => {
        console.log(err);
      }); 
  }