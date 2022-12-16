const db = require("../connection");
const format = require("pg-format");

const seed = ({ plantsdata }) => {
  return db.query(`DROP TABLE IF EXISTS plants;`).then(() => {
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
    const queryStr = format(
        `INSERT INTO plants
        ( common_name, latin_name, category, climate, origin, pruning, watering_advice, light_preference, picture_url, temp_range) VALUES %L
        RETURNING *;`, 
        plantsData.map({ common_name, latin_name, Category, Climate, Origin, Pruning, Watering, light_ideal, img, tempRangeCelsius }) => [])
    )
  })
};

// Category: "Dracaena",
//     Climate: "Tropical",
//     "Common name": ["Janet Craig"],
//     "Latin name": "Dracaena deremensis 'Janet Craig'",
//     "Light ideal": "Strong light",
//     Origin: "Cultivar",
//     Pruning: "If needed",
//     Watering: "Keep moist between watering & Can dry between watering",
//     id: "53417c12-4824-5995-bce0-b81984ebbd1d",
//     img: "http://www.tropicopia.com/house-plant/thumbnails/5556.jpg",
//     tempRangeCelsius: {
//       max: 30,
//       min: 10,
//     },

module.exports = seed;
