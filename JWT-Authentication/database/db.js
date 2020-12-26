const mongoose = require('mongoose');

const URL = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@${process.env.DB_Cluster}.oruin.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;


const connectToDB = async()=>{
    try{
        await mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true});
        console.log('//success// conected to DB');
    } catch(error){
        console.log('// ERROR // cannot connect to DB', error);
    }
}

module.exports = connectToDB;