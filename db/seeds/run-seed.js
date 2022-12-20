const { plantsData, userData , myPlantsData } = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");
const runSeed = () => {
  return seed(plantsData, userData, myPlantsData).then(() => db.end());
};

runSeed();
