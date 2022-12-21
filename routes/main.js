const express = require("express");
const { route } = require("../../R-L-Form/route/userStu");

const Detail = require("../src/models/registerClg")

const details = await RegisterStu.find();

route.get("/test", async (req, res) => {
    const details = await Detail.find();

    res.render("loginStu", {
        details: details
    });
    
});

