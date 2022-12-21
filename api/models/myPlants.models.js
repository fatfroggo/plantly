const db = require("../../db/connection");

exports.selectMyPlants = (username) => {
    
    return db.query(`
        SELECT username, category, climate, common_name, latin_name, light_preference, origin, pruning, watering_advice, picture_url, temp_max, temp_min, last_watered FROM myPlants
        JOIN plants ON plants.plant_id = myPlants.plant_id
        WHERE myPlants.username = $1;
    `, [ username ])
    .then((result) => {
        return result.rows
    })
}

