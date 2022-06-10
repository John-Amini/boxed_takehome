'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    shippingLocation: DataTypes.STRING,
    shippingCost: DataTypes.FLOAT,
    status: DataTypes.STRING,
    totalPrice:DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    Order.hasMany(models.OrderProduct,{foreignKey:'orderId'})

  };
  return Order;
};
