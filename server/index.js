const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const userRoute = require('./controllers/user');
const crudRoute = require("./controllers/crud");
const mongoose = require("mongoose"); // include mongoose library
// we open a connection that has the name of "mean-cart-db"
mongoose.connect("mongodb://localhost/mean-cart-db")
    .then(() => {
        console.log("Connection successful!!")
    })
    .catch((err) => {
        console.log("Connection went wrong... -> " +err.message);
    })

app.use(express.static('assets'));
app.use(cors());
app.use(express.json()); // to use json
app.use(express.urlencoded({extended: false})); 
app.use(session({
    secret: "meanshit",
    resave: false,
    saveUninitialized: false
}));

/* static files views
app.use("/views", express.static(__dirname + "/../public/dist")); */

/* get views
app.get('/', (req, res) => { // when the app is done, this redirect to the dist file
    res.redirect("views/index.html");    
});*/

// defining our routes
app.use("/user", userRoute);
app.use("/crud", crudRoute);

// start the server
let server = app.listen(3000, () => {
    let port = server.address().port;
    console.log(`THE SERVER IS RUNNING ON PORT # ${port}`);
}); 