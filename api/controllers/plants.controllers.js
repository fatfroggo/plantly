const {selectPlants} = require('../models/plants.models')


exports.getPlants = (req,res,next) => {

    const { climate } = req.query;
    selectPlants(climate).then((plants) => {
        res.status(200).send({plants})
    })
    .catch(next)
}