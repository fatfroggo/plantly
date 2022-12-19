const db = require('../../db/connection')


exports.selectPlants = () => {

    return db
    .query(
    `
    SELECT * FROM plants
    `
    )
    .then((result) => {
        return result.rows
    })
}

exports.selectPlantsById = (plant_id) => {
    return db.query(`
    SELECT * FROM plants WHERE plant_id = $1;
    `, [plant_id])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({ status: 404, msg: 'Not found'})
        }
        else {
        return result.rows[0]
        }
    })
}
