// require('dotenv').config();
const express = require("express");
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path  = require("path");
const app = express();
// const hbs = require("hbs"); 
const RegisterStu = require("./models/registerStu");
const registerStu = RegisterStu.find({});
const RegisterClg = require("./models/registerClg");
const registerClg = RegisterClg.find({});
const bcrypt = require("bcryptjs");
const ejs = require('ejs');
const Detail = require("./models/test");
const { Verify } = require("crypto");

// const StuRegister = require("./models/registerStu");
// const jwt = require('jsonwebtoken');


// mongoose.connect("mongodb://localhost:27017/registrationStdudent", () => {
//     console.log("DB Connected");

//     Detail.create
// })





require("./db/conn")
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// console.log(path.join(__dirname, "../templates/partials"));

app.use(express.static(static_path));

// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", template_path);
// ejs.registerPartials(partials_path);
// hbs.registerPartials(partials_path);

app.use('/css', express.static(__dirname + 'public/css'))
// console.log(__dirname + "\\public\\css");

// console.log(process.env.SECRET_KEY);

app.get("/dashboardStu", (req, res) => {
    registerStu.exec(function(err, data) {
        if(err) throw err;
        res.render('dashboardStu', {records: data});
        console.log(data);
    })
})


app.get("/", (req, res) => {
    res.render("index");
})


app.get("/registerStu", (req, res) => {
    res.render("registerStu");
})

app.get("/registerClg", (req, res) => {
    res.render("registerClg");
})



//create new user in db
app.post("/registerClg",async (req, res) => {

    try {

        const registerClg = new RegisterClg({
            clgName: req.body.clgName,
            clgEmail: req.body.clgEmail,
            password: req.body.password,
            clgConNo: req.body.clgConNo,
            clgIdClg: req.body.clgIdClg, 
            // labs: req.body.labs,
            address: req.body.address,
            city: req.body.city,
            zipcode: req.body.zipcode,
            apparatus: req.body.apparatus
        })

//         // console.log("the success part" +registerStu);

//         const token = await registerStu.generateAuthToken();
//         // console.log("the token " + token);

        const registeredClg = await registerClg.save();
//         // console.log("the page " + registered);

//         res.cookie("jwt", token);
//         console.log(cookie);

        res.status(201).render("index");

        // console.log(req.body.email);
//         // res.set(req.body.email);

    } catch (error) {
        res.status(400).send(error);
        console.log("error");
    }
})

app.post("/registerStu",async (req, res) => {
    try {

        const registerStu = new RegisterStu({
            fullName: req.body.fullName,
            username: req.body.username,
            gender: req.body.gender,
            password: req.body.password,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            phId: req.body.phId,
            clgName: req.body.clgName,
            clgId: req.body.clgId, 
            address: req.body.address,
            city: req.body.city,
            zipcode: req.body.zipcode
        })



        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alokranjan11052003@gmail.com',
            pass: 'ytemkggihzzjzybd'
        }
        });

        var mailOptions = {
        from: 'alokranjan11052003@gmail.com',
        to: 'kpande026@gmail.com',
        subject: 'Verification',
        text: `Student Name : `+req.body.fullName<br>
                `College: ` + req.body.clgName<br>
                `Student Contact No:` + req.body.mobileNo<br>
                `Student Id : ` + req.body.clgId<br>
                `Verify the details ... and send mail to alokranjan11052003@gmail.com`
         };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

//         // console.log("the success part" +registerStu);

//         const token = await registerStu.generateAuthToken();
//         // console.log("the token " + token);

        const registeredStu = await registerStu.save();
//         // console.log("the page " + registered);

//         res.cookie("jwt", token);
//         console.log(cookie);

        res.status(201).render("index");

//         // console.log(req.body.email);
//         // res.set(req.body.email);

    } catch (error) {
        res.status(400).send(error);
        console.log("error");
    }
})

app.get('/loginStu', (req, res) => {
    res.render("loginStu");
})

app.get('/loginClg', (req, res) => {
    res.render("loginClg");
    // console.log(RegisterStu);
})

// app.get("/dashboardStu", (req, res) => {
//     res.render("dashboardStu");
// })

// app.get("/dashboardClg", (req, res) => {
//     res.render("dashboardClg");
// })

// app.get("/dashboardStu", (req, res) => {
//     registerStu.exec(function(err, data) {
//         if(err) throw err;
//         res.render('dashboardStu', {records: data});
//     })
// })

//login validation
app.post('/dashboardStu', async (req, res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;


        const usernameD = await RegisterStu.findOne({username:username});


        const usernameN = await RegisterStu.findOne({username:username});


        const isMatch = await bcrypt.compare(password, usernameD.password);

        if(isMatch){
            registerClg.exec(function(err, data) {
                if(err) throw err;
                res.render('dashboardStu', {
                    name: usernameN.fullName,
                    // clgName: usernameN.clgName,
                    records: data});
                // console.log(data);
            })
            // res.send(usernameN.fullName)
            // res.status(201).render("dashboardStu", {name: usernameN.fullName});
            // console.log(usernameN.username);

        }else{
            res.send("<script>alert('Invalid Details')</script>"); 
        }

    } catch (error) {
        res.status(400).send("e");
    }
})



app.post('/cong', async (req, res) => {
    const apparatusStu = req.body.apparatusStu;
    console.log(apparatusStu);
    const appStu = apparatusStu;
    const arrStu = appStu.split(",")

    // console.log(arrStu);

    const zipcode = req.body.zipcode;
    console.log(zipcode);
    const usernameN = await RegisterClg.findOne({zipcode:zipcode});
    console.log(usernameN.apparatus);

    const appClg = usernameN.apparatus;
    const arrClg = appClg.split(",")
    console.log(arrClg);


    let count = 0;
                for(let i=0; i<arrStu.length; i++){
                    for(let j=0; j<arrClg.length; j++){
                        if(arrStu[i]===arrClg[j]){
                        count ++;
                    }
                    
                    }
                }
            if(count == arrStu.length){
                console.log("Yes");
            }else{
                console.log("no");
            }


    registerClg.exec(function(err, data) {
        if(err) throw err;
        res.render('cong', {name: usernameN.fullName, records: data, zipcode:req.body.zipcode});

    })

    // res.send( usernameN.clgName )

    // res.render('cong')



})





// app.post("/cong", async (req, res) => {
//     try {

//         // const username = req.body.username;
//         // const password = req.body.password;
//         // // const zipcode = req.body.zipcode;
//         // var apparatusStu = req.body.apparatusStu;
        
//         // // var apparatusStu = req.body.apparatusStu;
//         // console.log(apparatusStu);
        
//         // var arrStu = apparatusStu.split(',');
//         // console.log(arrStu);


//         // const usernameN = await RegisterStu.findOne({username:username});
//         // res.send("Welcome" + usernameN.username)

//         // // const appClg = await RegisterClg.findOne({apparatus:apparatus});
//         // // console.log(appClg.apparatus);

//         // // const zipC = await RegisterClg.findOne({zipcode:zip});
        
//         // // console.log(zipC.zipcode);

//         // // var arrClg = appClg.split(',')
//         // // console.log(arrClg);
//         res.render('cong');

        
//     } catch (error) {
        
//     }
// })

app.post('/dashboardClg', async (req, res) => {
    try {

        const clgIdClg = req.body.clgIdClg;
        const clgEmail = req.body.clgEmail;
        const password = req.body.password;

        // console.log(clgEmail);

        const usernameD = await RegisterClg.findOne({clgEmail:clgEmail});
//         // res.send(useremail.password );
        // console.log(usernameD.username);

        const usernameN = await RegisterClg.findOne({clgEmail:clgEmail});
        // const usernameS = await RegisterStu.findOne({username:username});
        // res.send("Welcome" + usernameS.username)
        // console.log(clgIdClg.clgIdClg);

        // console.log(usernameS);
        
        const isMatch = await bcrypt.compare(password, usernameD.password);

//         const token = await useremail.generateAuthToken();
//         console.log("the token " + token); 

        // console.log(usernameD.password);
        if(isMatch){
            
            // res.send(usernameN.fullName)
            res.status(201).render("dashboardClg", {clgName: usernameN.clgName});
            // console.log(usernameN.username);

        }else{
            res.send("<script>alert('Invalid Details')</script>"); 
        }

    } catch (error) {
        res.status(400).send("e");
    }
})






app.listen(port, () => {
    console.log(`server is running at ${port}`);
})