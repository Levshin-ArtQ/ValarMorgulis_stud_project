const keys = require("./keys");
const initialData = require("./initialData");
const db = require("./models");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false })); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// routes
require('./routes/auth.routes')(app);
const playersRouter = require('./routes/players');
const itemsRouter = require('./routes/items');
const locationsRouter = require('./routes/locations');
const messagesRouter = require('./routes/messages');
const tasksRouter = require('./routes/tasks');
// Подключение маршрутов
app.use('/players', playersRouter);
app.use('/items', itemsRouter);
app.use('/locations', locationsRouter);
app.use('/messages', messagesRouter);
app.use('/tasks', tasksRouter);

// Обработка несуществующих маршрутов
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
  console.error("Requested route does not exist " + req.url);
});


//sync database and start app
db.sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    console.log("Database resynced and connected");
    initialData(db);
    app.listen(5000);
    console.log("Listening port 5000")
  })
  .catch(err => console.log(err));

  
//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

