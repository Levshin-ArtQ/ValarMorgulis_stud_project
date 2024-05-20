module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    playerFrom: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Players', key: 'id' } },
    playerTo: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Players', key: 'id' } },
    messageText: { type: DataTypes.STRING(1000), allowNull: false }
  });

  return Message;
};