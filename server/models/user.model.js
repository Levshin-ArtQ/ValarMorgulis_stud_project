// const db = require('../util/database');
// const { Sequelize, DataTypes } = require('sequelize')

// здесь задается моделс, по сути define возвращает класс пользователя
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'users',
      {
        // Здесь определяются атрибуты модели
        UID:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        
      }
  );
  return User;
}
