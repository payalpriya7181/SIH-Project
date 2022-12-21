const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/registrationStdudent" , {
    useNewUrlParser: true,

}).then(() => {
    console.log("conncetion succesful");
}).catch((e) => {
    console.log("No Connection ");
})
