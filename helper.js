//////Create: Add a new record //////

//////Read: Retrieve the value of a record /////

//////Update: Update a record's value //////

//////Delete: Delete a record //////



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
const newUser = (email, password) => {
  const id = generateRandomString();
  users[id] = {
    id,
    email,
    password
  };
  return id;
};

const checkRegistration = (email, password) => {
  if (email && password) {
    return true;
  }
  return false
};

const checkEmail = email => {
  return Object.values(users).find(user => user.email === email);
}


// generate random string
function generateRandomString() {
return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
}

module.exports = {urlDatabase, users, newUser, checkRegistration, checkEmail, generateRandomString}