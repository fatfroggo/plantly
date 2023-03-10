const db = require("../connection");
const format = require("pg-format");

const seed = ( plantsData, userData, myPlantsData ) => {
 
  return db.query(`DROP TABLE IF EXISTS plants cascade;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS myPlants;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`
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
        temp_min INT,
        time_between_watering INT
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
        username VARCHAR(100) PRIMARY KEY NOT NULL,
        password VARCHAR(100) NOT NULL,
        profile_picture VARCHAR(200),
        email VARCHAR(200)
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE myPlants (
        my_plant_id SERIAL PRIMARY KEY,
        username VARCHAR(40) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
        plant_id INT,
        FOREIGN KEY (plant_id) REFERENCES plants(plant_id) ON DELETE CASCADE ON UPDATE CASCADE,
        last_watered_date DATE NOT NULL,
        nickname VARCHAR(40)
        );`);
    })
    .then(() => {
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
          plant.time_between_watering
        ];
      });
      
      const queryStr = format(
        `INSERT INTO plants
        ( common_name, latin_name, category, climate, origin, pruning, watering_advice, light_preference, picture_url, temp_max, temp_min, time_between_watering ) VALUES %L
        RETURNING *;`,
        formattedPlants
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [
          user.username,
          user.password,
          user.profile_picture,
          user.email,
        ];
      });
      const queryStr = format(
        `
        INSERT INTO users
        ( username, password, profile_picture, email) VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedMyPlants = myPlantsData.map((myPlant) => {
        return [
          myPlant.username,
          myPlant.plant_id,
          myPlant.last_watered_date,
          myPlant.nickname
        ];
      });
      const queryStr = format(
        `
        INSERT INTO myPlants
        ( username, plant_id, last_watered_date, nickname) VALUES %L RETURNING *;`,
        formattedMyPlants
      );
      return db.query(queryStr);
    })
};

module.exports = seed;
