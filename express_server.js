const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
//configure ejs templats///////
app.set("view engine", "ejs");
//////////////////////////////


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
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
  res.render("urls_new");
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
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});




app.get("/hello", (req, res) => {
  const templateVars = { greeting: 'Hello World!' };
  res.render("hello_world", templateVars);
});


app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
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

//takes the port and a callback
app.listen(PORT, () => {
  console.log(`TinyApp app listening on port ${PORT} boi!`);
});

