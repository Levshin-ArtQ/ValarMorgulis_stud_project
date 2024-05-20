module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(30), allowNull: false },
    playerclass: { type: DataTypes.ENUM('Knight', 'Wizard', 'Thief', 'Paladin'), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    level: { type: DataTypes.INTEGER, allowNull: false },
    position: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  return Player;
};
