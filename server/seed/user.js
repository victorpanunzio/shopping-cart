const Product = require("../dbconfig/schemas/product");
const User = require("../dbconfig/schemas/user"); // my model
const mongoose = require("mongoose");
const auth = require("../middlewares/isAuth");
const md5 = require("apache-md5");
const session = require("express-session");
mongoose.connect("mongodb://localhost/mean-cart-db")

const userRegister = (req, res) => {
    console.log(req);
    var user = new User({ 
        name: req.name,
        email: req.email,
        username: req.username,  
        password: req.password
    });
    
    user.save( (err, result) => {
        if (err) {
            return res.status(500).send({msg: "Could not register the user"}).json();
        }else{
            return res.status(200).send({msg: "Registration susccessful!"}).json();
            exit();
        }
    }); 
};

const userLogin = (req, res) => {
    // we need the model
    User.findOne({username: req.username}, (err, docs) => {
        if (err) {
            console.log("ERROR TRYING FINDING THE USER... -> " + err);
            return res.send({status: 500, msg: "User not founded"}).json();
        } else {
            if(auth.comparePassword(req.password,docs.password)){
                console.log(docs);
                return res.send({status: 200, msg: "User is logged", userid: docs._id, username: docs.username, root: "/userhome"}).json();
                
            }else{
                return res.send({status: 500, msg: "Username / password incorrect"}).json();
            }
        }
    });
}

const uploadProduct = (req, res) => {
    //console.log(req);
    var product = new Product({
        pro_name: req.proname,
        pro_desc: req.prodescription,
        pro_img: req.proimage,
        pro_quantity: parseInt(req.proquantity),
        pro_price: parseInt(req.proprice),
        pro_userid: req.userid
    });

    product.save( (err, result) => {
        console.log('okkkk saved');
        if(err){
            console.log('okkkk error');
            console.log(err);
            return res.status(500).send({msg: "Could not register the product"}).json();
        } else {
            console.log('okkkk saved todo oki');
            return res.status(200).send({msg: "Product registered successfully!"}).json();
            
        }
    });
}

const exit = () => mongoose.disconnect();    

module.exports.userRegister = (req, res) => userRegister(req, res);
module.exports.userLogin = (req, res) => userLogin(req, res);
module.exports.uploadProduct = (req, res) => uploadProduct(req, res); 