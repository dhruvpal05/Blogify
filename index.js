const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog')
const mongoose = require('mongoose');
const cookiepaser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require("./models/blog");

const app = express();
const PORT = 8002;

mongoose.connect("mongodb://localhost:27017/blogify").then((err) =>{
    console.log("mongoDB connected")
});

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookiepaser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", async (req,res) => {
    const allblogs = await Blog.find({});
    return res.render("home",{
        user:req.user,
        blogs:allblogs,
    });
})

app.use('/user',userRouter);
app.use('/blog',blogRouter);



app.listen(PORT, () => {console.log(`server started at PORT ${PORT}`)})