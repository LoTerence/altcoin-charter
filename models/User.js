const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

//User Schema
const UserSchema = mongoose.Schema({
  // TODO: Add a name field
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchList: {
    //An array of coin objects
    type: Array,
  },
});

// pre-save validation for unique fields, returns mongoose validation error instead of E11000 error from MongoDB
UserSchema.plugin(uniqueValidator);

// before saving a new user, salt and hash the password field
UserSchema.pre("save", async function (next) {
  const user = this;
  this.password = bcrypt.hashSync(user.password, 10);
  next();
});

// returns true if the password param matches the hashed password of the user this method is called on
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
};

const User = (module.exports = mongoose.model("User", UserSchema));

// ------------------------------------------ Services ------------------------------------------ //
module.exports.addUser = function (newUser, callback) {
  newUser.save(callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};
