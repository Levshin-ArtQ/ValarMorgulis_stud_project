const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: 'postgres',
        dialect: 'postgres',
    }
);

module.exports = sequelize;