const {selectPlants, selectPlantsById} = require('../models/plants.models')


exports.getPlants = (req,res,next) => {

    const { climate, common_name } = req.query;
    selectPlants(climate, common_name).then((plants) => {
        res.status(200).send({plants})
    })
    .catch(next)
}

exports.getPlantsById = (req, res, next) => {

    const { plant_id } = req.params; 

    selectPlantsById(plant_id).then((plant) => {
        res.status(200).send({plant})
    })
    .catch(next)
}