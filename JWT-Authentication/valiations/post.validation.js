const JOI = require('@hapi/joi');

let PostValidation = JOI.object({
    city: JOI.string().max(20).required(),
    country: JOI.string().max(20).required(),
    state: JOI.string().max(20).required()
});


let validateUserPost =data => PostValidation.validate(data); 


module.exports ={validateUserPost};