module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    locationId: { type: DataTypes.STRING(10), primaryKey: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    locationType: { type: DataTypes.ENUM('Forest', 'Desert', 'Dungeon', 'River', 'Ocean', 'City', 'Castle', 'Wall'), allowNull: false }
  });

  return Location;
};