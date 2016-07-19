export default function ExpensePool(sequelize, DataTypes) {
  return sequelize.define('ExpensePool', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    created: DataTypes.DATE,
    paid: DataTypes.DATE,
    closed: DataTypes.BOOLEAN,
  });
}
