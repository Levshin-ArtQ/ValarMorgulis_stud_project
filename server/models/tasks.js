module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Players", key: "id" },
    },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  });

  return Item;
};
