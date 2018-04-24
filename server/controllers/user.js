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
    myuser.userRegister(req.body, res);
}); 

route.post("/login", (req, res) => {
    myuser.userLogin(req.body, res);
});

route.post("/modifyProduct", (req, res) => {
    myuser.updateProduct(req, res);
});

route.post("/deleteProduct", (req, res) => {
    myuser.deleteProduct(req, res);
});

route.get("/getitemsq/:id", (req, res) => {
    //console.log(req.params.id);
    myuser.getCartQ(req.params, res);
});

/* UPLOAD FILE */ 
const path = ".\\assets\\uploads";
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