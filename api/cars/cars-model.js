const db = require('../../data/db-config');

const getAll = () => {
  return db('cars')
};

async const getById = (id) => {
  const result = await db('cars').where('id', id).first()
  return result
};

async const create = (car) => {
  const [id] = await db('cars').insert(car)
  return getById(id)
};
