'use strict';
const path = require('path');
const Helper = require('../helper/util'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const helper = new Helper(); 
    const cities = helper.readExcelFile(path.join(__dirname, '../data/cities.xlsx')); 
    
    // First, delete existing data
    await queryInterface.bulkDelete('Cities', null, {});
    await queryInterface.bulkInsert('Cities', cities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
