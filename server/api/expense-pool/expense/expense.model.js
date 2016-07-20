export default function User(sequelize, DataTypes) {
  return sequelize.define('Expense', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    paid: DataTypes.BOOLEAN,
  });
}
