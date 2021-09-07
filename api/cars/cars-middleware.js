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
  const { vin, make, model, mileage } = req.body;
  if(vin === undefined || make === undefined || model === undefined || mileage === undefined) {
    next({ message: '<field name> is missing', status: 400 })
  } else{ 
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(typeof vin !== 'string') {
    next({ message: 'vin <vin number> is invalid', status: 400})
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  Cars.getByVin(vin)
    .then((vinInUse) => {
      if(vinInUse.length > 0) {
        next({ message: 'vin <vin number> already exists', status: 400 })
      } else { 
        next()
      }
    })
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }