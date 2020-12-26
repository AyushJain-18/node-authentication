const mongoose = require('mongoose');

let UsersPost = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    }
}, {
    timestamps: true // this will automatically  add 2 timestamp createdAt and UpatedAT
});

let UserPost = mongoose.model('Posts', UsersPost);


module.exports = UserPost;