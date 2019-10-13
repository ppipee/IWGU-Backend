const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const placeRateScema = new Schema({
    placeID: String,
    name: String,
    rate: Number,
})

const PlaceRate = mongoose.model('PlaceRate', placeRateSchema);
module.exports = PlaceRate