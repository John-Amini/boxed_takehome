'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    salePrice: DataTypes.INTEGER,
    boughtPrice: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    description: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};