'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    static associate(models) {
      // Quan hệ với User và Post
      Rental.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }

  Rental.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      rentalStartDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      rentalEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      renterPhone: {
        type: DataTypes.STRING,
        allowNull: true, // Thay thế `userId`
      },
    },
    {
      sequelize,
      modelName: "Rental",
      tableName: "Rentals",
      timestamps: true,
    }
  );

  return Rental;
};
