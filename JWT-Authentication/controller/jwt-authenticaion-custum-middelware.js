const JWT  =  require('jsonwebtoken')
let auth = async (req,res,next) =>{
    const token = req.header('auth-token');
    console.log(token, process.env.JWT_SECRET_TOKEN);
    if(!token){
        return res.status(401).send('Not Authorized, Access Denied');
    }
    try{
        const isTokenVerified = await JWT.verify(token, process.env.JWT_SECRET_TOKEN);
        console.log(isTokenVerified);
        req.verify = isTokenVerified;
        next();
    } catch(error){
        console.log('error', error)
    }
}

module.exports ={auth}