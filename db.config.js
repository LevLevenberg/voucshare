const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://levlevenberg:compaq610@ds255253.mlab.com:55253/voucshare',
    { useNewUrlParser: true }
).catch();

console.log('connected to database');
