//finds user object by email. 
// in this file to seperate from the other helper functions for testing

const findUserByEmail = (users, email) => {
  for (const id in users) {
    const user = users[id];
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

module.exports = { findUserByEmail }