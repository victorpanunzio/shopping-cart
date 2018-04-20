const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const route = express.Router();

const Product = require("../dbconfig/schemas/product");
const User = require("../dbconfig/schemas/user");
const myuser = require("../seed/user");

mongoose.connect("mongodb://localhost/mean-cart-db");
 
// CREATE A NEW USER
route.post("/register", (req, res) => {
    //console.log("request shit"+req.body.name); // todo ok (req.body -> object)
    myuser.userRegister(req.body, res);
    //res.send("okk");
}); 

route.post("/login", (req, res) => {
    //console.log("user->" + req.body.username + "pw->" + req.body.password); // todo ok (req.body -> object)
    myuser.userLogin(req.body, res);
});

/* UPLOAD FILE */ 
const path = "C:\\Users\\lenri\\Desktop\\MEAN\\mean-cart\\server\\uploads";
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({storage: storage});;

route.post("/uploadproduct", upload.single('file'), (req, res, next) => {
    //console.log(req.body);
    myuser.uploadProduct(req.body, res);
});
//route.post("/uploadproduct", () => console.log('holaaa') );
/* //UPLOAD FILE */

module.exports = route;