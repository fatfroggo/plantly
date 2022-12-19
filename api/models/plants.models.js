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


