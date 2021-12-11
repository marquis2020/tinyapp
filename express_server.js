const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//configure ejs templats///////
app.set("view engine", "ejs");
//////////////////////////////


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "jackT", 
    email: "user@ex.com", 
    password: "123"
  },
 "user2RandomID": {
    id: "JillV", 
    email: "user2@ex.com", 
    password: "456"
  }
};
//////Create: Add a new record //////

//////Read: Retrieve the value of a record /////

//////Update: Update a record's value //////

//////Delete: Delete a record //////



// generate random string
function generateRandomString() {
return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
}
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
  res.cookie('userId', req.body.username);
  res.redirect("/urls");
});
//log out by clearing the cookie we had set
app.post("/logout", (req, res) => {
  res.clearCookie('userId');
  res.redirect("/urls");
});
//endpoint, which returns the template you just created
app.get("/register", (req,res) => {
  let templateVars = { userId: req.cookies["userId"] };
  res.render("urls_register", templateVars);
});
//register new user and add them to the user object
app.post("/register", (req,res) => {
  const userId = generateRandomString();
  users[userId] = {
    id: userId,
    email: req.body.email,
    password: req.body.password
  };
  res.cookie('userId', userId);
  res.redirect('/urls');
})

//takes the port and a callback
app.listen(PORT, () => {
  console.log(`TinyApp app listening on port ${PORT} boi!`);
});

