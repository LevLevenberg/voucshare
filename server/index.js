const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

//set up express app
const app = express();
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Authorization');

    next();
}
//import db connection
require('./db.config');
app.use(bodyParser.json());
app.use(passport.initialize());
require('./passport')(passport);
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.use('/api',require('./routes/voucher'));
app.use('/api',require('./routes/user'));
app.use('/api',require('./routes/offer'));
app.use('/api',require('./routes/category'));
app.use('/api',require('./routes/location'));

app.use((err,req,res,next)=>{
    res.status(442);//.send({err:err.message})
})
const PORT = process.env.PORT||5000
app.listen(PORT, ()=>{
    console.log(`now listening on port ${PORT}`);
});

