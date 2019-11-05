const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plannerSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    name: String,
    days: [
        {
            day: Number,
            date: Date,
            places: [
                {
                    place: {
                        placeID: String,
                        categoryCode: String,
                        name: String,
                    },
                    time: {
                        start: Date,
                        end: Date
                    }
                }
            ],
            note: String
        }
    ],
    share: Boolean
});

const Planner = mongoose.model('Planner', plannerSchema);
module.exports = Planner;