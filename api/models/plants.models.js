const db = require('../../db/connection')

exports.selectPlants = (climate) => {
    const validClimates = [
      "Tropical",
      "Subtripical",
      "Arid Tropical",
      "Tropical humid",
      "Subtropical arid",
    ];

    let queryStr = `SELECT * FROM plants`;
    let queryValues = []

    if(climate){
        if (!validClimates.includes(climate)) {
          if (climate.test(/^\d+$/)) {
          if (climate.match(/^\d+$/)) {
            return Promise.reject({
              status: 400,
              msg: "Invalid climate query",
            });
          }
          return Promise.reject({ status: 404, msg: "Climate not found" });
        }
        queryStr += ` WHERE climate = $1;`;
        queryValues.push(climate)
    }

    return db
    .query(queryStr, queryValues)
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
