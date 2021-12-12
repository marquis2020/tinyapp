const express = require("express");
const { urlDatabase, users, newUser, checkRegistration, checkEmail, generateRandomString, findUserByEmail }= require('./helper');
const app = express();
const PORT = 8080; // default port 8080
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//configure ejs templats///////
app.set("view engine", "ejs");
//////////////////////////////

//ROUTES
//route to render the urls_new.ejs template btn code in header.ejs
app.get("/urls/new", (req, res) => {
  let templateVars = { userId: req.cookies["userId"] };
  res.render("urls_new", templateVars);
});

//creates new random string and assings it
app.post("/urls", (req, res) => {
  let ID = generateRandomString();
  urlDatabase[ID] = req.body.longURL
  res.redirect(`/urls/${ID}`);     
});
//rdirects user to long url website 
app.get("/u/:shortURL", (req, res) => {
  console.log(req.params)
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(`${longURL}`);
});



// passes in our urlDatabase as a second param 
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase,
    userId: req.cookies["userId"]
  };

  res.render("urls_index", templateVars);
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    userId:req.cookies["userId"],
   shortURL: req.params.shortURL, 
   longURL: urlDatabase[req.params.shortURL] 
  };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/');
});



// delete the url from the index page 
app.post("/urls/:shortURL/delete", (req, res) => {
  let { shortURL } = req.params;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
})
  // updates saved urls
  app.post("/urls/:shortURL/update", (req, res) => {
    const shortURL = req.params.shortURL;
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
    res.redirect(`/urls/${req.params.shortURL}`);

 })
 
 //post requst to habdle log in and set cookie and log in!
 app.post("/login", (req,res) => {
  const email = req.body.email; 
  const password = req.body.password;

  const user = findUserByEmail(email);

  if (!user || user.password != password) {
    return res.status(403).send("a user with that email doesn't exist")
  }


  res.cookie('userId', user.id);
  res.redirect("/urls");
});
app.get("/login", (req, res) => {
  let templateVars = { userId: req.cookies["userId"] };
  res.render("urls_login", templateVars);
});
//log out by clearing the cookie we had set
app.post("/logout", (req, res) => {
  res.clearCookie('userId');
  res.redirect("/login");
});
//endpoint, which returns the template you just created
app.get("/register", (req,res) => {
  let templateVars = { userId: req.cookies["userId"] };
  res.render("urls_register", templateVars);
});
//register new user and add them to the user object
app.post("/register", (req,res) => {
  const email = req.body.email;
  const password = req.body.email;
  if (!checkRegistration(email, password)) {
   return res.status(400).send('Email and/or password is missing');
  } 
  
  if (checkEmail(email)) {
    return res.status(400).send('This email is already in use')
  } 
  const userId = newUser(email, password);
    
  res.cookie('userId', userId);
  res.redirect('/urls');
  
})

//takes the port and a callback
app.listen(PORT, () => {
  console.log(`TinyApp app listening on port ${PORT} boi!`);
});

