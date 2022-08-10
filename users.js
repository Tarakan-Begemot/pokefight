const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

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
//saving the user to db
      const res = await newUser.save();
}
}
