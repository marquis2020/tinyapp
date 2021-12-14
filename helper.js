//////Create: Add a new record //////

//////Read: Retrieve the value of a record /////

//////Update: Update a record's value //////

//////Delete: Delete a record //////



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
    password: "123"
  },
  "JillV": {
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

const findUserByEmail = (email) => {
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
  urlDatabase, 
  users, 
  newUser, 
  checkRegistration, 
  checkEmail, 
  generateRandomString, 
  findUserByEmail, 
  getUsersUrls
}