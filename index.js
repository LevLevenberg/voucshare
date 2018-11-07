const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get('env') !== 'production';

if(!dev){
    app.disable('x-powerd-by');
    app.use(compression());
    app.use(morgan('common'));

    app.use(express.static(path.resolve(__dirname, 'build')));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}

if(dev){
    app.use(morgan('dev'));
}
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

// app.use((err,req,res,next)=>{
//     res.status(442);//.send({err:err.message})
// })
const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err;
    console.log(`server started on ${PORT}`)
})

