const xlsx = require('xlsx');

class Helper {
  constructor() {
    this.conjunctions = ['in', 'or', 'and']; 
  }

  // Function to read an Excel file and return its content as JSON
  readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet).map(entry => ({
      ...entry,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  // Function to create all possible combinations of the extracted entities
  createCombinations(entities) {
    const entityTypes = ['city', 'dishType', 'diet', 'brand'];
    const typeMap = {};

    // Group entities by their type
    entities.forEach(({ type, id, name }) => {
      if (!typeMap[type]) {
        typeMap[type] = [];
      }
      typeMap[type].push({ id, name });
    });

    // Generate combinations ensuring only one entity of each type
    return entityTypes.reduce((combinations, type) => {
      if (typeMap[type]) {
        return combinations.flatMap(combination =>
          typeMap[type].map(entity => ({ ...combination, [type]: entity }))
        );
      }
      return combinations;
    }, [{}]).filter(combination => Object.keys(combination).length > 0);
  }

  // Helper function to split and filter terms
  splitAndFilterTerms(searchTerm) {
    return searchTerm.split(' ').filter(term => !this.conjunctions.includes(term.toLowerCase()));
  }

  // Helper function to create replacements for SQL query
  createReplacements(terms) {
    return terms.reduce((acc, term, index) => {
      acc[`mainTerm${index}`] = `%${term}%`;
      return acc;
    }, {});
  }
  // Function to generate a SQL WHERE clause for matching terms
  generateWhereClause(words, prefix = '') {
    return words.map((word, index) => `LOWER(name) LIKE LOWER(:${prefix}mainTerm${index})`).join(" OR ");
  }
}



module.exports = Helper;
