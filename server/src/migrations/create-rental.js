'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Rentals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            postId: { // Giữ lại để liên kết với bài đăng
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: { 
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentId: { 
                type: Sequelize.STRING
            },
            paymentStatus: { 
                type: Sequelize.STRING,
                defaultValue: 'pending'
            },
            rentalStartDate: { 
                type: Sequelize.DATEONLY,
                defaultValue: Sequelize.NOW
            },
            rentalEndDate: { 
                type: Sequelize.DATEONLY
            },
            renterPhone: { // Thêm trường mới để lưu số điện thoại người thuê
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: { 
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: { 
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Rentals');
    }
};