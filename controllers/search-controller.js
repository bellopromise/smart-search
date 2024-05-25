const SmartSearchService = require('../services/smart-search-service');

class SearchController {
  async search(req, res) {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(400).json({ error: 'searchTerm query parameter is required' });
    }

    try {
      const service = new SmartSearchService();
      const entities = await service.extractEntities(searchTerm);
      res.json(entities);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SearchController();
