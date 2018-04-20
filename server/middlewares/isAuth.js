const mongoose = require("mongoose");
const md5 = require("apache-md5");
mongoose.connect("mongodb://localhost/mean-cart-db")


//dbpw is already encrypted because it came from the mongodb collection
const comparePassword = (loginpw, dbpw) => ( (md5(loginpw, dbpw)==dbpw) ? true : false );
 
module.exports.comparePassword = (loginpw, dbpw) => comparePassword(loginpw, dbpw);