

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