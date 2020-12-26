require('dotenv').config();
const express               = require('express');
const morgan                = require('morgan');
const connectToDB           = require('./database/db');
const authenticateRoutes    = require('./routes/authentication') 
const userPostRoutes        = require('./routes/userpost') 


const app = express();
connectToDB();

app.use(express.json()); // to take/read json response;
app.use(morgan('combined'));

app.get('/', (req,res) => res.send('default route'));
app.use('/api/authenticate', authenticateRoutes);
app.use('/api/userpost', userPostRoutes);
app.listen(9000, ()=> console.log('server is running on port 9000'));