'use strict';

const path = require('path');
const Helper = require('../helper/util'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const helper = new Helper(); 
    const brands = helper.readExcelFile(path.join(__dirname, '../data/brands.xlsx'));

    await queryInterface.bulkDelete('Brands', null, {});
    await queryInterface.bulkInsert('Brands', brands, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
