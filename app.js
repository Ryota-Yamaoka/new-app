const express = require('express');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcrypt');
const ejs = require("ejs");

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yama20020420',
  database: 'tocre'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

app.use((req, res, next) => {
  if(req.session.userId === undefined){
    console.log("ログインしていません");
    res.locals.username = "ゲスト";
    res.locals.isLoggedIn = false;
  }else{
    console.log("ログインしています");
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
})

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get("/create-select", (req, res) => {
  res.render("create-select.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs", {errors:[]});
});

app.post("/signup",

 (req, res, next) => {
   console.log("入力値の空チェック");

   const username = req.body.username;
   const email = req.body.email;
   const password = req.body.password;

   const errors = [];

   if(username === ""){
     errors.push("ユーザー名が空です");
   }
   if(email === ""){
     errors.push("メールアドレスが空です");
   }
   if(password === ""){
     errors.push("パスワードが空です");
   }

   console.log(errors);

   if(errors.length > 0){
     res.render("signup.ejs", {errors:errors});
   }else{
     next();
   }
 },
 (req, res, next) => {
   console.log("メールアドレスの重複チェック");
   const email = req.body.email;
   const errors = [];
   connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        if (results.length > 0) {
          errors.push("ユーザー登録に失敗しました");
          res.render("signup.ejs", {errors:errors});
        } else {
          next();
        }
      }
    );
 },
 (req, res) => {
   console.log('ユーザー登録');
     const username = req.body.username;
     const email = req.body.email;
     const password = req.body.password;
     bcrypt.hash(password, 10, (error, hash) => {
       connection.query(
       'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
       [username, email, hash],
       (error, results) => {
         req.session.userId = results.insertId;
         req.session.username = username;
         res.redirect('/');
       }
     );
     })
   }
 );

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        const plain = req.body.password;
        const hash = results[0].password;
        bcrypt.compare(plain, hash, (error, isEqual) => {
          if(isEqual){
            req.session.userId = results[0].id;
            req.session.username = results[0].username;
            res.redirect('/');
          }else{
            res.redirect("/login");
          }
        })
      } else {
        res.redirect('/login');
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/");
  })
});

app.get("/painting-know", (req, res) => {
  res.render("painting-know.ejs");
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

app.get("/dream-know", (req, res) => {
  res.render("dream-know.ejs");
});

app.get("/sei-know", (req, res) => {
  res.render("sei-know.ejs");
});

app.get("/battle-know", (req, res) => {
  res.render("battle-know.ejs");
});

app.get("/culture-know", (req, res) => {
  res.render("culture-know.ejs");
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

// app.listen(3000);

http.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});
