// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Order.init({
//     userId: DataTypes.INTEGER,
//     shippingLocation: DataTypes.STRING,
//     shippingCost: DataTypes.FLOAT,
//     status: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Order',
//   });
//   return Order;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    shippingLocation: DataTypes.STRING,
    shippingCost: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    // Order.belongsToMany(models.Product,{through:models.OrderProduct})
  };
  return Order;
};
