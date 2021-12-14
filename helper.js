//helper function file
cookieSession = require('cookie-session')
const express = require("express");
const { findUserByEmail } = require('./helpers')
const PORT = 8080; // default port 8080
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const bcrypt = require('bcryptjs');
//base database for sites 
//these sites are for testing
const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    usersId: "jackT"
  },
  i9sm5xK: {
    longURL: "http://www.google.com",
    usersId: "JillV"
  }
};
//base data base for users
// these users are for testing
const users = {
  "jackT": {
    id: "jackT",
    email: "user@ex.com",
    password: bcrypt.hashSync("123", 10)
  },
  "JillV": {
    id: "JillV",
    email: "user2@ex.com",
    password: bcrypt.hashSync("456", 10)
  }
};
//creates a new user and adds it to the user
const newUser = (userId, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  users[userId] = {
    id: userId,
    email: email,
    password: hashedPassword,
  };
  return userId;
};
//checks if a user is already registered
const checkRegistration = (email, password) => {
  if (email && password) {
    return true;
  }
  return false
};
//checks if a email its already assosiated to a users account at registration 
const checkEmail = email => {
  return Object.values(users).find(user => user.email === email);
}
// gets the specific urls for specific users
const getUsersUrls = function (id) {
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