const { readJSON } = require("../models/api.models")

exports.getJSON = (req, res, next) => {
    const JSON = readJSON()
    res.status(200).send(JSON)
}