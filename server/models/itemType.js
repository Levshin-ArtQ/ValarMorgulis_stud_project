module.exports = (sequelize, DataTypes) => {
  const ItemType = sequelize.define('ItemType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  });

  return ItemType;
};