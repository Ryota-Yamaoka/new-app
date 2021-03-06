const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require("ejs");
const cool = require('cool-ascii-faces');
require("dotenv").config();
const bodyParser = require("body-parser");
const firebaseConfig = {
  apiKey: "x",
  authDomain: "x",
  projectId: "x",
  storageBucket: "x",
  messagingSenderId: "x",
  appId: "x",
  measurementId: "x",
};
const PORT = process.env.PORT || 3000;
console.log("port", PORT);

const pgp = require("pg-promise")(/* options */);
const connection = {
  host: "localhost",
  port: 5432,
  database: "tocre",
  user: "postgres",
  password: "",
};
const db = pgp(connection);

app.get('/users/:userId', (req, res) => {
  db.one("SELECT * FROM users WHERE id=$1", [req.params.userId])
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });
})

app
  // .use(express.static(path.join(__dirname, 'public')))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.json())
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('top'))
  

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

app.use((req, res, next) => {
  if (req.session.isLoggedIn) {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  } else {
    res.locals.username = "ゲスト";
    res.locals.isLoggedIn = false;
  }
  next();
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get("/create-select", (req, res) => {
  res.render("create-select.ejs");
});

app.get("/login", (req, res) => {
  res.locals.apiKey = firebaseConfig.apiKey;
  res.locals.authDomain = firebaseConfig.authDomain;
  res.locals.projectId = firebaseConfig.projectId;
  res.locals.storageBucket = firebaseConfig.storageBucket;
  res.locals.messagingSenderId = firebaseConfig.messagingSenderId;
  res.locals.appId = firebaseConfig.appId;
  res.locals.measurementId = firebaseConfig.measurementId;
  res.render("login 3.ejs");
});

app.post("/login", async (req, res) => {
  req.session.username = req.body.name;
  req.session.isLoggedIn = true;
  res.sendStatus(200);
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/");
  });
});

app.get("/painting-know", (req, res) => {
  res.render("painting-know.ejs");
  // if(req.session.isLoggedIn === true){
  //   ...
  // }else{
  //   ...
  // }
});

app.get("/painting-comment", (req, res) => {
  res.render("painting-comment.ejs");
});

app.get("/music-comment", (req, res) => {
  res.render("music-comment.ejs");
});

app.get("/prof", (req, res) => {
  res.render("prof.ejs");
});

app.get("/purchase", (req, res) => {
  res.render("purchase.ejs");
});

app.get("/contribute", (req, res) => {
  res.render("contribute.ejs");
});

app.get("/purchase-finish", (req, res) => {
  res.render("purchase-finish.ejs");
});

app.get("/contribute-finish", (req, res) => {
  res.render("contribute-finish.ejs");
});

app.get("/human-know", (req, res) => {
  res.render("human-know.ejs");
});

app.get("/rinri-know", (req, res) => {
  res.render("rinri-know.ejs");
});

app.get("/japan-know", (req, res) => {
  res.render("japan-know.ejs");
});

app.get("/tech-know", (req, res) => {
  res.render("tech-know.ejs");
});

app.get("/school-know", (req, res) => {
  res.render("school-know.ejs");
});

app.get("/book-know", (req, res) => {
  res.render("book-know.ejs");
});

app.get("/movie-know", (req, res) => {
  res.render("movie-know.ejs");
});

app.get("/music-know", (req, res) => {
  res.render("music-know.ejs");
});

app.get("/nature-know", (req, res) => {
  res.render("nature-know.ejs");
});

app.get("/policy-know", (req, res) => {
  res.render("policy-know.ejs");
});

app.get("/love-know", (req, res) => {
  res.render("love-know.ejs");
});

app.get("/global-know", (req, res) => {
  res.render("global-know.ejs");
});

app.get("/corona-know", (req, res) => {
  res.render("corona-know.ejs");
});

app.get("/sei-know", (req, res) => {
  res.render("sei-know.ejs");
});

app.get("/battle-know", (req, res) => {
  res.render("battle-know.ejs");
});

app.get("/event-know", (req, res) => {
  res.render("event-know.ejs");
});

app.get("/now-know", (req, res) => {
  res.render("now-know.ejs");
});

app.get("/seikatsu-know", (req, res) => {
  res.render("seikatsu-know.ejs");
});

app.get("/walk-know", (req, res) => {
  res.render("walk-know.ejs");
});

app.get("/relation-know", (req, res) => {
  res.render("relation-know.ejs");
});

app.get("/sns-know", (req, res) => {
  res.render("sns-know.ejs");
});

app.get("/japanese-know", (req, res) => {
  res.render("japanese-know.ejs");
});

app.get("/english-know", (req, res) => {
  res.render("english-know.ejs");
});

app.get("/society-know", (req, res) => {
  res.render("society-know.ejs");
});

app.get("/math-know", (req, res) => {
  res.render("math-know.ejs");
});

app.get("/science-know", (req, res) => {
  res.render("science-know.ejs");
});

app.get("/all-know", (req, res) => {
  res.render("all-know.ejs");
});

app.get("/moral-know", (req, res) => {
  res.render("moral-know.ejs");
});

app.get("/info-know", (req, res) => {
  res.render("info.ejs");
});

app.get("/helth-know", (req, res) => {
  res.render("helth-know.ejs");
});

app.get("/pe-know", (req, res) => {
  res.render("pe-know.ejs");
});

app.get("/merosu-know", (req, res) => {
  res.render("merosu-know.ejs");
});

app.get("/sangetsuki-know", (req, res) => {
  res.render("sangetsuki-know.ejs");
});

app.get("/friend-know", (req, res) => {
  res.render("friend-know.ejs");
});

app.get("/ukuraina-know", (req, res) => {
  res.render("ukuraina-know.ejs");
});

app.get("/rossia-know", (req, res) => {
  res.render("rossia-know.ejs");
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));