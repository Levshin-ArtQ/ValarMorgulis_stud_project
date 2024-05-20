const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: 'postgres', //better through to config and check why it is postgres and not localhost
        dialect: 'postgres',
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Player = require('./player')(sequelize, DataTypes);
db.ItemType = require('./itemType')(sequelize, DataTypes);
db.Item = require('./item')(sequelize, DataTypes);
db.Location = require('./location')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);
db.Task = require('./tasks')(sequelize, DataTypes);


// Определение связей
db.Player.hasMany(db.Item, { foreignKey: 'owner' });
// – создает однонаправленную связь один ко многим 
// между Player и Item, 
// где один игрок может владеть множеством предметов.
db.Item.belongsTo(db.Player, { foreignKey: 'owner' });

db.Player.hasMany(db.Task, { foreignKey: 'owner' });
// – создает однонаправленную связь один ко многим 
// между Player и Item, 
// где один игрок может владеть множеством предметов.
db.Task.belongsTo(db.Player, { foreignKey: 'owner' });
// указывает, что каждый предмет принадлежит одному игроку.

db.ItemType.hasMany(db.Item, { foreignKey: 'itemType' });
db.Item.belongsTo(db.ItemType, { foreignKey: 'itemType' });
// ItemType и Item связаны как один ко многим, 
// где один ItemType может быть связан с множеством Item.

db.Player.hasMany(db.Message, { as: 'MessagesSent', foreignKey: 'playerFrom' });
db.Player.hasMany(db.Message, { as: 'MessagesReceived', foreignKey: 'playerTo' });
db.Message.belongsTo(db.Player, { as: 'Sender', foreignKey: 'playerFrom' });
db.Message.belongsTo(db.Player, { as: 'Recipient', foreignKey: 'playerTo' });
// Player и Message связаны как один ко многим в обе 
// стороны для отправленных и полученных сообщений

// Экспорт моделей
module.exports = db;