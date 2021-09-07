const e = require('express');
const Cars = require('./cars-model');

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id)
    .then(car => {
      if(car) {
        req.car = car
        next()
      } else { 
        next({ message: 'car with id <car id> is not found', status: 404 })
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }