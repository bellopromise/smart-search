const { sequelize, City, Brand, DishType, Diet } = require('../models');
const SmartSearchService = require('../services/smart-search-service');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await City.bulkCreate([
    { name: 'London' },
    { name: 'Manchester' },
  ]);

  await Brand.bulkCreate([
    { name: "McDonald's" },
  ]);

  await DishType.bulkCreate([
    { name: 'Sushi' },
  ]);

  await Diet.bulkCreate([
    { name: 'Vegan' },
    { name: 'Vegetarian' },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

test('extractEntities returns correct entity for "McDonald\'s"', async () => {
  const service = new SmartSearchService();
  const result = await service.extractEntities("McDonald's");
  expect(result).toEqual([
    {
      brand: { id: expect.any(Number), name: "McDonald's" },
    },
  ]);
});

test('extractEntities returns correct entities for "McDonald\'s in London"', async () => {
  const service = new SmartSearchService();
  const result = await service.extractEntities("McDonald's in London");
  expect(result).toEqual([
    {
      city: { id: expect.any(Number), name: 'London' },
      brand: { id: expect.any(Number), name: "McDonald's" },
    },
  ]);
});

test('extractEntities returns correct entities for "vegan sushi in London"', async () => {
  const service = new SmartSearchService();
  const result = await service.extractEntities("vegan sushi in London");
  expect(result).toEqual([
    {
      city: { id: expect.any(Number), name: 'London' },
      diet: { id: expect.any(Number), name: 'Vegan' },
      dishType: { id: expect.any(Number), name: 'Sushi' },
    },
  ]);
});

test('extractEntities returns multiple combinations for "Veg sushi"', async () => {
  const service = new SmartSearchService();
  const result = await service.extractEntities("Veg sushi");
  expect(result).toEqual([
    {
      diet: { id: expect.any(Number), name: 'Vegan' },
      dishType: { id: expect.any(Number), name: 'Sushi' },
    },
    {
      diet: { id: expect.any(Number), name: 'Vegetarian' },
      dishType: { id: expect.any(Number), name: 'Sushi' },
    },
  ]);
});

test('extractEntities returns multiple combinations for "McDonald\'s in London or Manchester"', async () => {
  const service = new SmartSearchService();
  const result = await service.extractEntities("McDonald's in London or Manchester");
  expect(result).toEqual([
    {
      city: { id: expect.any(Number), name: 'London' },
      brand: { id: expect.any(Number), name: "McDonald's" },
    },
    {
      city: { id: expect.any(Number), name: 'Manchester' },
      brand: { id: expect.any(Number), name: "McDonald's" },
    },
  ]);
});
