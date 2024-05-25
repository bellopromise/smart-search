const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const Helper = require('../helper/util');

class SmartSearchService {
  constructor() {
    this.helper = new Helper();
  }

  async extractEntities(searchTerm) {
    const terms = this.helper.splitAndFilterTerms(searchTerm);
    const replacements = this.helper.createReplacements(terms);
    const whereClause = this.helper.generateWhereClause(terms);

    const query = `
      SELECT 'city' AS type, id, name FROM Cities WHERE ${whereClause}
      UNION ALL
      SELECT 'dishType' AS type, id, name FROM DishTypes WHERE ${whereClause}
      UNION ALL
      SELECT 'diet' AS type, id, name FROM Diets WHERE ${whereClause}
      UNION ALL
      SELECT 'brand' AS type, id, name FROM Brands WHERE ${whereClause}
    `;

    const entities = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements,
    });

    return this.helper.createCombinations(entities);
  }
}

module.exports = SmartSearchService;
