'use strict';
const path = require('path');
const Helper = require('../helper/util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const helper = new Helper(); 
    const dishTypes = helper.readExcelFile(path.join(__dirname, '../data/dish-types.xlsx'));

    await queryInterface.bulkDelete('DishTypes', null, {});
    await queryInterface.bulkInsert('DishTypes', dishTypes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DishTypes', null, {});
  }
};
