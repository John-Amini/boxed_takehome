'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    salePrice:DataTypes.FLOAT,
    boughtPrice:DataTypes.FLOAT,
    quantity:DataTypes.INTEGER
  }, {});
  OrderProduct.associate = function(models) {

    OrderProduct.belongsTo(models.Order,{ foreignKey: 'orderId' })
    OrderProduct.belongsTo(models.Product,{foreignKey:'productId'})

  };
  return OrderProduct;
};
