const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const route = express.Router();

const Product = require("../dbconfig/schemas/product");
const User = require("../dbconfig/schemas/user");

/* CART CRUD */
/* ADD TO CART */
route.post("/addtocart/", (req, res) => {
    alreadyBought(req.body, (data) => {
        console.log(data);
        if(!data){
            User.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.body.pro_userid)}, 
            {$push: {cart: {_id: mongoose.Types.ObjectId(req.body.pro_id), q: req.body.quantity}}},
            {safe: true, upsert: true},
            (err, ok) => {
                if(err) console.log('errorrr-> ' + err);
                res.send({msg: "Product added to cart!", status: 200}).json();
            });
        } else {
            console.log(data);
            res.send({msg: "Product selected is already on the cart !!", status: 500}).json();
        }
    });
});

const alreadyBought = (req, cb) => {
    let exits = false;
    User.findById({_id: req.pro_userid}, 'cart', (err, ok) => {
        if(err){
            console.log("Error -> "+err);
        } else {
            let myarray = [];
            for(let val of ok.cart){
                myarray.push(String(val._id));
            }
            exits = (myarray.includes(String(req.pro_id)) ? true : false );
            cb(exits);
        }
    });
}

route.get("/getMyCart/:userid", (req, res) => {
    //console.log(req.params.userid);
    User.findById({_id: req.params.userid})
    .populate('cart._id')
    .exec( (err, usercart) => {
        if (err) {
            console.log("Error -> "+err);
        } else {
            if(usercart.cart.length>0){
                for(const cart of usercart.cart){
                    console.log("->"+cart._id)
                    if(cart._id === null){
                        usercart.cart.splice(cart.index,1);
                        usercart.save((err) => {if(err) console.log(err)});
                    }else{
                        console.log("Everything is ok");
                    }
                }
            }
            console.log('here is my cart -> '+usercart.cart);
            res.status(200).send(usercart.cart);
        }
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
    /*The positional $ operator identifies an element in an array to update without explicitly specifying 
    the position of the element in the array.*/
    User.update({_id: req.body.userid, "cart._id": req.body.proid},
    {$set: { "cart.$.q": parseInt(req.body.proquantity)}}, (err, ok) => {
        if (err) console.log('erriorrrr-> '+ err);
        console.log("todo excelente->"+JSON.stringify(ok));
    })
});

route.post("/searchitem", (req, res) => {
    console.log(req.body.key); 
    Product.find({pro_name: { $regex: '.*' + req.body.key + '.*', $options: 'i'}}, (err, ok) => {
        if(err) {
            res.send({msg: '404, ARTICLE NOT FOUND', status: 404});
        }else{
            if(ok==0){
                res.send({msg: '404, ARTICLE NOT FOUND', status: 404});
            } else {
                res.send(ok);
            }
        }
    }) 
})

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