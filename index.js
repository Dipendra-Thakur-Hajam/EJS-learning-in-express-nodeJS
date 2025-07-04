const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("viwes", path.join(__dirname, "/views"));

app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public/JS")));
app.use(express.static(path.join(__dirname, "/public/CSS")))

app.get("/", (req, res) =>{
    res.render("home");  //home.ejs
});

// passing Data from DataBase to EJS
app.get("/rolldice", (req, res) => {
    let num = Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs", {num});
});



// // Instagram Router
// app.get("/ig/:username", (req, res) => {
//     const followers = ["Dipendra", "Thakur", "Hajam", "Ray", "Bauwa"];
//     let {username} = req.params;
//     res.render("instagram.ejs", {username, followers});
//     console.log(username);
// });

// more efficient instagram
app.get("/ig/:username", (req, res) => {
    let { username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    console.log(data);
    if(data){
         res.render("instagram.ejs", { data });
    }else{
        res.render("error.ejs");
    }

});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});