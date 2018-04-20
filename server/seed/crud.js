const express = require("express");
const mongoose = require("mongoose");
const Product = require("../dbconfig/schemas/product");
mongoose.connect("mongodb://localhost/mean-cart-db");

// C R U D

// MY CART CONTENT
// .find() finds all instances in the database that match the query you pass in.
// It returns an array, even if there is only one item in the array.
// No query passed in means "find everything"    
const getAll = (req, res) => {
    Product.find((err, products) => {
        if (err)
        {
            console.log(err);
        }else{
            console.log('si hizo ok');
            
        } 
    });
}

const exit = () => mongoose.disconnect();

module.exports.getAll = () => getAll();