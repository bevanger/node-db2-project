const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

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
  const { vin, make, model, mileage } = req.body;
  if(vin === undefined) {
    next({ message: 'vin is missing', status: 400 })
  } else if (make === undefined) { 
      next({ message: 'make is missing', status: 400 })
  } else if (model === undefined) {
    next({ message: 'model is missing', status: 400 })
  } else if (mileage === undefined) {
    next({ message: 'mileage is missing', status: 400 })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(vinValidator.validate(req.body.vin)) {
    next()
  } else {
    next({ message: `vin ${req.body.vin} is invalid`, status: 400})
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  Cars.getByVin(vin)
    .then((vinInUse) => {
      if(vinInUse) {
        next({ message: `vin ${vin} already exists`, status: 400 })
      } else { 
        next()
      }
    })
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }