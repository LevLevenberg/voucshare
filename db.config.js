const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27017/voucshare',
    { useNewUrlParser: true }
).catch();

console.log('connected to database');
