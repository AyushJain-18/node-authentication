const express  = require('express');
const bcrpty   = require('bcrypt');

const app = express();
app.use(express.json())

const userDB =[]; 


app.get('/', (req, res) => {
    res.send('success')
})

app.post('/sign-up', async (req, res)=>{
    let name     = req.body.username;
    let password = req.body.password;
    if(name && password){
        try{
            let hashpassword = await bcrpty.hash(password, 10);
            let userObj  ={name, password:hashpassword}
            userDB.push(userObj);
            console.log('user have been added to db', userDB);
            res.status(200);
            res.send('Successfully signed up');
            return;
        } catch{
            console.log('error');
            res.status(500);
            res.send('Server Error');
            return;
        }
    }   else{
        res.status(400);
        res.send('user name and password cannot be empty');
        return;
    }
})


app.post('/sign-in', async(req, res) => {
    let name     = req.body.username;
    let password = req.body.password;
    if(name && password){
            let user = userDB.find(eachUser => eachUser.name === name);``
            if(!user){
                res.status(400);
                res.send('no user found');
                return;
            }
            try{
                let isUser = await bcrpty.compare(password, user.password);
                if(isUser){
                    res.status(200);
                    res.send('Successfully signed in')
                }else{
                    res.status(200);
                    res.send('wrong password')
                }
            }
            catch{
                res.status(400);
                res.send('user name and password cannot be empty');
            }
    }else{
        res.status(400);
        res.send('user name and password cannot be empty');
    }
})

app.listen(8000, ()=>console.log('app is running on port 8000'))