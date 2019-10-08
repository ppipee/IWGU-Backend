const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const placeScema = new Schema({
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
    date: {
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean,
        friday: Boolean,
        saturday: Boolean,
        sunday: Boolean
    },
    time: {
        open: String,
        close: String
    },
    address: String,
    tel: String
});

const Place = mongoose.model('Place', placeScema);
module.exports = Place;