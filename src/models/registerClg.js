const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken")

const collegeSchema = new mongoose.Schema({
    clgName: {
        type: String,
        required: true
    },
    clgEmail: {
        type: String,
        required: true,
        unique: true
    },

    clgConNo: {
        type: Number,
        required: true
    },
    clgIdClg: {
        type: String,
        unique: true
    },

    labs: {
        type: String,
    },
    password: {
        type: String,
        required: true,
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
    },
    apparatus: {
        type: String
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

collegeSchema.pre("save", async function(next){

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

const ClgRegister = new mongoose.model("ClgRegister", collegeSchema);

module.exports = ClgRegister;