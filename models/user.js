const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    name: {
        type: String,
        minlength: 1,
    },
    status: String,
    favourite: [{
        placeID: String,
        categoryCode: String,
    }],
    planner: [String]
});

const User = mongoose.model('User', userSchema);
module.exports = User;