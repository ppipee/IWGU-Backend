const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    category: [String],
    description: {
        type: String,
        trim: true,
    },
    img: [String],
    rate: Number,
    days: {
        day1: Boolean,
        day2: Boolean,
        day3: Boolean,
        day4: Boolean,
        day5: Boolean,
        day6: Boolean,
        day7: Boolean
    },
    time: String,
    howToTravel: String,
    service: {
        payment: [String],
    },
    location: {
        address: String,
        district: String,
        postcode: String,
        province: String,
        sub_districe: String,
    },
    map: {
        latitude: Number,
        longitude: Number
    }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;