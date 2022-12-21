const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken")

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true
    },
    phId: {
        // required: true
    },
    clgName:{
        type: String,
        required: true
    },
    clgId: {
        // required: true
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    }
    // tokens: [{
    //     token:{
    //         type: String,
    //         required: true  
    //     }
    // }]
})

//genrating token
// StudentSchema.methods.generateAuthToken = async function(){
//     try {
//         console.log(this._id);
//         const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     } catch (error) {
//         res.send(error);
//     }
// }

studentSchema.pre("save", async function(next){

    if(this.isModified("password")){
        // const passwordHash = await bcrypt.hash(this.password, 10);
        console.log(this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);

        // this.confirmPassword = undefined;
    }

    
    next();
})

//collection

const StuRegister = new mongoose.model("StuRegister", studentSchema);

module.exports = StuRegister;