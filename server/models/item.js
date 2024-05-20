module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "ItemTypes", key: "id" },
    },
    quality: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: { min: 0, max: 100 },
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Players", key: "id" },
    },
    name: { type: DataTypes.STRING(30), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  });

  return Item;
};
