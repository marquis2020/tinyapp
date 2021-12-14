const { assert } = require('chai');

const { findUserByEmail} = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('findUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = findUserByEmail(testUsers, "user@example.com")
    const expectedUserID = testUsers.userRandomID;
    assert.equal(user, expectedUserID);
  });
  it('return undefined with an invalid email', function() {
    const user = findUserByEmail("user4@example.com", testUsers);
    assert.equal(user, undefined);
  });

  
});