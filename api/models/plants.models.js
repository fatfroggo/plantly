const db = require("../../db/connection");

exports.selectPlants = (climate, common_name) => {
  const validClimates = [
    "Tropical",
    "Subtripical",
    "Arid Tropical",
    "Tropical humid",
    "Subtropical arid",
  ];

  let queryStr = `SELECT * FROM plants`;
  let queryValues = [];

  if (climate || common_name) {
    if (climate) {
      if (!validClimates.includes(climate)) {
        if (climate.test(/^\d+$/)) {
          return Promise.reject({
            status: 400,
            msg: "Invalid climate query",
          });
        }
        return Promise.reject({ status: 404, msg: "Climate not found" });
      }
      queryStr += ` WHERE climate = $1;`;
      queryValues.push(climate);

      if (common_name) {
        if (common_name.test(/^\d+$/)) {
          return Promise.reject({
            status: 400,
            msg: "Invalid name query",
          });
        }
        queryStr += ` AND common_name LIKE '%$2%';`;
        queryValues.push(common_name);
      }
    } else {
      if (common_name.test(/^\d+$/)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid name query",
        });
      }
      queryStr += `WHERE common_name LIKE '%$1%'`;
      queryValues.push(common_name);
    }
  }

  return db.query(queryStr, queryValues).then((result) => {
    return result.rows;
  });
};

exports.selectPlantsById = (plant_id) => {
  return db
    .query(
      `
    SELECT * FROM plants WHERE plant_id = $1;
    `,
      [plant_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return result.rows[0];
      }
    });
};
