const express         = require('express');
const passport        = require('passport');
const GoogleStrategy  = require('passport-google-oauth20').Strategy;   
const app = express();

// 1.u need to create or add your project to google console and ther u will have these 
// 2. there u also need to add your callback url "Authorized redirect url", once user approve google chrome
// then user will be redirected to   Authorized redirect url === callbackURL
const keys={
    google_client_id        :'637912965377-f1md8uulfcmlr2cdstbrct49pdvesn56.apps.googleusercontent.com',
    google_client_secret    :'tZLlQU-Afc6HhocbQtHlNeRM'
}

passport.use(new GoogleStrategy(
    {
        clientID: keys.google_client_id,
        clientSecret: keys.google_client_secret,
        callbackURL: '/auth/google/callback'
    },(accessToken, refreshToken, profile, cb)=>{
            // this function will be fired when we/server make 2nd request 
            console.log('accessToken',  accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile',      profile);
            cb();
        }   
));

app.get('/', (req, res)=>res.send('Default route created'));
// now we need to have 2 route configured 
 // 1. to initiate route
 // 2.  redirect route


 app.get('/auth/google', passport.authenticate('google' ,{scope: ['email', 'profile']}))
 app.get('/auth/google/callback', passport.authenticate('google'));



 app.listen(5000, ()=> console.log('Server is running on port 5000'));