const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type        : String,
        min         : 6,
        max         : 255,
        required    : true
    },
    email: {
        type        : String,
        min         : 6,
        max         : 255,
        required    : true
    },
    password:{
        type        : String,
        min         : 6,
        required    : true
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // this will automatically  add 2 timestamp createdAt and UpatedAT
});

let user = mongoose.model('Users', userSchema);

module.exports = user;