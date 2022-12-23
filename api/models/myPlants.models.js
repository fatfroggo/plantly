const db = require("../../db/connection");

exports.selectMyPlants = (username) => {
  return db
    .query(
      `
SELECT my_plant_id, username, category, climate, common_name, latin_name, light_preference, origin, pruning, watering_advice, picture_url, temp_max, temp_min, last_watered_date, time_between_watering, nickname FROM myPlants
JOIN plants ON plants.plant_id = myPlants.plant_id
WHERE myPlants.username = $1;
`,
      [username]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.addMyPlants = (username, plant_id, last_watered_date, nickname) => {
  if (last_watered_date) {
    return db
      .query(
        `
INSERT INTO myPlants (username, plant_id, last_watered_date, nickname) VALUES ($1, $2, $3, $4) RETURNING *`,
        [username, plant_id, last_watered_date, nickname]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};


exports.selectMyPlantsById = (my_plant_id) => {
  return db
    .query(
      `
    SELECT my_plant_id, username, plants.plant_id, last_watered_date, nickname, common_name, latin_name, category, climate, origin, pruning, watering_advice, light_preference, picture_url, temp_max, temp_min, time_between_watering FROM myPlants JOIN plants ON myPlants.plant_id = plants.plant_id WHERE my_plant_id = $1;
    `,
      [my_plant_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return result.rows[0];
      }
    })
  
};

exports.deleteSelectedPlant = (my_plant_id) => {
  return db
    .query(
      `
    DELETE FROM myPlants WHERE my_plant_id = $1;
    `,
      [my_plant_id]
    )
};

exports.updateMyPlant = (my_plant_id, username, newNickname) => {
  if("nickname" in newNickname){
    return db.query(`
      UPDATE myPlants SET nickname = $1 WHERE my_plant_id = $2 AND username = $3 RETURNING *;
    `, [newNickname.nickname, my_plant_id, username])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg : "The given my_plant_id was not found for the given user"})
      }
      return result.rows[0]
    })
  }
  else {
    return Promise.reject({ status: 400, msg: "Bad request"})
  }
}