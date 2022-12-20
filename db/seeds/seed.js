const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { plantsData, userData } = data;
 
  await db.query(`DROP TABLE IF EXISTS plants;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

  const plantTable = db.query(`
CREATE TABLE plants (
plant_id SERIAL PRIMARY KEY,
common_name VARCHAR(100) NOT NULL,
latin_name VARCHAR(100) NOT NULL,
category VARCHAR(40) NOT NULL,
climate VARCHAR(40) NOT NULL,
origin VARCHAR(40), 
pruning VARCHAR(100) NOT NULL,
watering_advice TEXT NOT NULL,
light_preference TEXT NOT NULL,
picture_url TEXT,
temp_max INT,
temp_min INT
);`);
  const usersTablePromise = db.query(`
CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
profile_picture VARCHAR(200) ,
description VARCHAR(1000) ,
email VARCHAR(200)
);`);


await Promise.all([plantTable, usersTablePromise]);

  const formattedPlants = plantsData.map((plant) => {
    if (!plant.common_name) plant.common_name = "N/A";
    else if (plant.common_name.length === 1)
      plant.common_name = plant.common_name[0];
    else {
      plant.common_name = plant.common_name.toString();
    }
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
      plant.tempRangeCelsius.min,
    ];
  });
  const queryStr = format(
    `INSERT INTO plants
( common_name, latin_name, category, climate, origin, pruning, watering_advice, light_preference, picture_url, temp_max, temp_min) VALUES %L
RETURNING *;`,
    formattedPlants
  );
  const insertUsersQueryStr = format(
    "INSERT INTO users ( username, password, profile_picture,description,email) VALUES %L RETURNING *;",
    userData.map(
      ({ username, password, profile_picture, description, email }) => [
        username,
        password,
        profile_picture,
        description,
        email,
      ]
    )
  );

  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  const plantPromise = db.query(queryStr).then((result) => {
  return result.rows
});

  await Promise.all([plantPromise, usersPromise]);
};

module.exports = seed;
