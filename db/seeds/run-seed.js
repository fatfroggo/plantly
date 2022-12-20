const { plantsData, userData } = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(plantsData, userData).then(() => db.end());
};

runSeed();
