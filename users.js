const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


module.exports = {
  Mutation: {
async register(_, 
    { 
  registerInput: { username, email, password, confirmPassword } 
},
    ) {
  
  
  //hashing the psw
      password = await bcrypt.hash(password, 12);
      //form user obj
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
