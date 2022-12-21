const db = require("../../db/connection");

exports.selectMyPlants = (username) => {
  return db
    .query(
      `
SELECT my_plant_id, username, category, climate, common_name, latin_name, light_preference, origin, pruning, watering_advice, picture_url, temp_max, temp_min, last_watered FROM myPlants
JOIN plants ON plants.plant_id = myPlants.plant_id
WHERE myPlants.username = $1;
`,
      [username]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.addMyPlants = (username, plant_id, last_watered) => {
  if (last_watered) {
    return db
      .query(
        `
INSERT INTO myPlants (username, plant_id, last_watered) VALUES ($1, $2, $3) RETURNING *`,
        [username, plant_id, last_watered]
      )
      .then((result) => {
        console.log(result.rows);
        return result.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};
