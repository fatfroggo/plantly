const {selectPlants} = require('../models/plants.models')


exports.getPlants = (req,res,next) => {
    selectPlants().then((plants) =>{
        res.status(200).send({plants})
        
    })
    .catch(next)
}