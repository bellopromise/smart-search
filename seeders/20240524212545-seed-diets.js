'use strict';

const path = require('path');
const Helper = require('../helper/util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const helper = new Helper(); 
    const diets = helper.readExcelFile(path.join(__dirname, '../data/diets.xlsx'));

    await queryInterface.bulkDelete('Diets', null, {});
    await queryInterface.bulkInsert('Diets', diets, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diets', null, {});
  }
};
