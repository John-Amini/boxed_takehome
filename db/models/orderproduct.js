// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class OrderProduct extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       models.Order.belongsToMany(models.Product,{through:OrderProduct})
//       models.Product.belongsToMany(models.Order,{through:OrderProduct})
//     }
//   }
//   OrderProduct.init({

//   }, {
//     sequelize,
//     modelName: 'OrderProduct',
//   });
//   return OrderProduct;
// };


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
    // associations can be defined here
    // models.Order.belongsToMany(models.Product,{through:OrderProduct})
    // models.Product.belongsToMany(models.Order,{through:OrderProduct})

    OrderProduct.belongsTo(models.Order,{ foreignKey: 'orderId' })


  };
  return OrderProduct;
};
