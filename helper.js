//////Create: Add a new record //////

//////Read: Retrieve the value of a record /////

//////Update: Update a record's value //////

//////Delete: Delete a record //////
cookieSession = require('cookie-session')
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const bcrypt = require('bcryptjs');

const urlDatabase = {
  b2xVn2: { 
    longURL: "http://www.lighthouselabs.ca",
    usersId:"jackT"
  },
  i9sm5xK: { 
    longURL: "http://www.google.com", 
    usersId :"JillV"
  }
};

const users = { 
  "jackT": {
    id: "jackT", 
    email: "user@ex.com", 
    password:  bcrypt.hashSync("123", 10)
  },
  "JillV": {
    id: "JillV", 
    email: "user2@ex.com", 
    password: bcrypt.hashSync("456", 10)
  }
};
const newUser = (userId, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  users[userId] = {
    id: userId,
    email: email,
    password: hashedPassword,
  };
  return userId;
};

const findUserByEmail = (users,email) => {
  for(const id in users) {
    const user = users[id];
    if(user.email === email) {
      return user;
    }
  }
  return null;
}

const checkRegistration = (email, password) => {
  if (email && password) {
    return true;
  }
  return false
};

const checkEmail = email => {
  return Object.values(users).find(user => user.email === email);
}

const getUsersUrls = function(id) {
  let yourUrls = {};
  for (const shortURL of Object.keys(urlDatabase)) {
    if (urlDatabase[shortURL].usersId === id) {
      yourUrls[shortURL] = urlDatabase[shortURL];
      
    }
  }
  return yourUrls;
}


// generate random string
function generateRandomString() {
return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
}

module.exports = {
  cookieSession,
  express,
  app,
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
}