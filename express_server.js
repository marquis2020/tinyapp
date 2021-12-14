const { cookieSession,
  express,
  PORT,
  cookieParser,
  bodyParser,
  urlDatabase,
  users,
  newUser,
  checkRegistration,
  checkEmail,
  generateRandomString,
  findUserByEmail,
  getUsersUrls,
  bcrypt
} = require('./helper');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['onekey']
}))


//configure ejs templats///////
app.set("view engine", "ejs");
//////////////////////////////

//ROUTES
//route to render the urls_new.ejs template btn code in header.ejs
app.get("/urls/new", (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.redirect("/login");
  }
  let templateVars = {
    userId: userId
  };
  res.render("urls_new", templateVars);
});

//creates new random string and assings it
app.post("/urls", (req, res) => {
  const userId = req.session.userId;
  const longURL = req.body.longURL;
  let ID = generateRandomString();
  urlDatabase[ID] = {
    longURL,
    usersId: userId
  };
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
  const userId = req.session.userId;;
  const user = users[userId];

  if (!user) {
    return res.status(400).send('please login')
  }

  const urls = getUsersUrls(userId);

  const templateVars = {
    urls,
    userId
  };
  res.render("urls_index", templateVars);
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls2.json", (req, res) => {
  res.json(users);
});


//shows the urls on the edit page
app.get("/urls/:shortURL", (req, res) => {
  const userId = req.session.userId;
  const shortURL = req.params.shortURL;

  const templateVars = {
    userId: userId,
    shortURL: shortURL,
    longURL: urlDatabase[shortURL]['longURL'],
    user: users[userId]
  };

  if (!userId) {
    res.redirect("/login");
  }


  res.render("urls_show", (templateVars));


});

app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/');
});



// delete the url from the index page 
app.post("/urls/:shortURL/delete", (req, res) => {
  //let { shortURL } = req.params;
  const shortURL = req.params.shortURL;
  const userId = req.session.userId;
  const urlUserId = urlDatabase[shortURL]['usersId'];

  if (urlUserId === userId) {
    delete urlDatabase[shortURL];
  }

  res.redirect('/urls');
})
// updates saved urls
app.post("/urls/:shortURL/update", (req, res) => {
  const userId = req.session.userId;
  const shortURL = req.params.shortURL;
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = { longURL: req.body.longURL, usersId: userId };
  res.redirect(`/urls/${req.params.shortURL}`);

})

//post requst to habdle log in and set cookie and log in!
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = findUserByEmail(users, email);

  if (!user || !password) {
    return res.status(403).send(" user doesn't exist")
  }
  if (Object.keys(user).length > 0 && bcrypt.compareSync(password, user.password)) {

  }

  req.session.userId = user['id'];
  res.redirect("/urls");
});


app.get("/login", (req, res) => {
  let userId = req.session.userId;
  let templateVars = { userId };
  res.render("urls_login", templateVars);
});
//log out by clearing the cookie we had set
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});
//endpoint, which returns the template you just created
app.get("/register", (req, res) => {
  let userId = req.session.userId;
  let templateVars = { userId };
  res.render("urls_register", templateVars);
});
//register new user and add them to the user object
app.post("/register", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  if (!checkRegistration(email, password)) {
    return res.status(400).send('Email and/or password is missing');
  }

  if (checkEmail(email)) {
    return res.status(400).send('This email is already in use')
  }
  const userId = generateRandomString();
  const newUserProfile = newUser(userId, email, password);

  req.session.userId = userId;
  res.redirect('/urls');

})

//takes the port and a callback
app.listen(PORT, () => {
  console.log(`TinyApp app listening on port ${PORT} boi!`);
});
