const db = require("../connection");
const format = require("pg-format");

const seed = ( plantsdata ) => {
  return db.query(`DROP TABLE IF EXISTS plants;`)
  .then(() => {
    return db.query(`
    CREATE TABLE plants (
        plant_id SERIAL PRIMARY KEY,
        common_name VARCHAR(40) NOT NULL,
        latin_name VARCHAR(100) NOT NULL,
        category VARCHAR(40) NOT NULL,
        climate VARCHAR(40) NOT NULL,
        origin VARCHAR(40) NOT NULL, 
        pruning VARCHAR(100) NOT NULL,
        watering_advice TEXT NOT NULL,
        light_preference TEXT NOT NULL,
        picture_url TEXT,
        temp_min INT,
        temp_max INT
    );`
    );
  })
  .then(() => {
    const formattedPlants = plantsData.map((plant) => {
      return [
        plant.common_name,
        plant.latin_name,
        plant.Category,
        plant.Climate,
        plant.Origin,
        plant.Pruning,
        plant.Watering,
        plant.light_ideal,
        plant.img,
        plant.tempRangeCelsius.max,
        plant.tempRangeCelsius.min
      ]
    })

    const queryStr = format(
        `INSERT INTO plants
        ( common_name, latin_name, category, climate, origin, pruning, watering_advice, light_preference, picture_url, temp_range) VALUES %L
        RETURNING *;`, 
        formattedPlants )
        return db.query(queryStr)
  })
  .then((insertedPlants) => {
    console.log(insertedPlants.rows)
  })
};

module.exports = seed;
