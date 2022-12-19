const db = require('../../db/connection')


exports.selectPlants = (climate) => {
    const validClimates = [
      "Tropical",
      "Subtripical",
      "Arid Tropical",
      "Tropical humid",
      "Subtropical arid",
    ];

    if(!validClimates.includes(climate)) {

        if (climate.match(/^\d+$/)) {
          return Promise.reject({
            status: 400,
            msg: "Invalid climate query",
          });
        }
        return Promise.reject({ status: 404, msg: "Climate not found"})
    }

    let queryStr = `SELECT * FROM plants`;
    let queryValues = []

    if(climate){
        queryStr += ` WHERE climate = $1;`;
        queryValues.push(climate)
    }

    return db
    .query(queryStr, queryValues)
    .then((result) => {
        return result.rows
    })
}


