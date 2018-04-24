const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const route = express.Router();

const Product = require("../dbconfig/schemas/product");
const User = require("../dbconfig/schemas/user");
const crud = require("../seed/crud");

/* CART CRUD */
/* ADD TO CART */
route.post("/addtocart/", (req, res) => {
    //alreadyBought(req.body);
    User.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.body.pro_userid)}, 
    {$push: {cart: {_id: mongoose.Types.ObjectId(req.body.pro_id), q: req.body.quantity}}},
    {safe: true, upsert: true},
    (err, ok) => {
        if(err) console.log('errorrr-> ' + err);
        console.log('todo okk -> ' + ok.cart);
    });
});

/* exits on cart */
const alreadyBought = (req) => {
    User.findById({_id: req.pro_userid}, 'cart', (err, ok) => {
        for(var i=0; i<ok.cart; i++){
            console.log(ok.cart[i]);
        }
    })
}
/* GET CART BY ID */

route.get("/getMyCart/:userid", (req, res) => {
    //console.log(req.params.userid);
    User.findById({_id: req.params.userid})
    .populate('cart._id')
    .exec( (err, usercart) => {
        if (err) console.log("errorrr-> "+ err);
        console.log('here is my cart -> '+usercart.cart);
        res.status(200).send(usercart.cart);
    });    
});

route.post("/deleteitem", (req, res) => {
    User.update({_id: req.body.userid},
    {$pull: {cart: {_id: req.body.proid}}}, (err, ok) => {
        if(err){
            res.status(500).send({status: 500, msg: 'An error ocurred'+err}).json();
        } else {
            res.status(200).send({status: 200, msg: 'Action successful!'}).json();
        }
    });
});

route.post("/updateitem", (req, res) => {
    console.log(req.body);
    User.update({_id: req.body.userid},
    {$set: {cart: {_id: req.body.proid, q: parseInt(req.body.proquantity)}}}, (err, ok) => {
        if (err) console.log('erriorrrr-> '+ err);
        console.log("todo excelente->"+ok);
    })
});

/*// CRUD */

/* other services */
route.get("/getMyProducts/:id", (req, res) => {
    console.log(req.params)
    Product.find({pro_userid: req.params.id}, (err, docs) => {
        if (err) console.log('err'+err);
        res.status(200).send(docs);
    });
});
/* GET ALL THE PRODUCTS COLLECTIONS */
route.get("/getAll", (req, res) => {
    Product.find((err, products) => {
        if (err) res.send({status: 404, msg: "Error"+err});
        console.log('si hizo ok');
        res.send(products);
    });
});

module.exports = route;