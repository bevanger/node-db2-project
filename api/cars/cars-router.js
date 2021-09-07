const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');
const Cars = require('./cars-model');

const router = require('express').Router()

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
});

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car)
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ 
        message: err.message,
        stack: err.stack
    })
});

module.exports = router