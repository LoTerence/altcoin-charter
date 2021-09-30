const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

//User Schema
const UserSchema = mongoose.Schema({
  // TODO: Add a name field and give it some functionality
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleid: String,
  name: String,
  secret: String,
  password: {
    type: String,
  },
  watchList: {
    //An array of coin objects
    type: Array,
  },
});

// pre-save validation for unique fields, returns mongoose validation error instead of E11000 error from MongoDB
UserSchema.plugin(uniqueValidator);

// passport plugins
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

// returns true if the password param matches the hashed password of the user this method is called on
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
};

const User = (module.exports = mongoose.model("User", UserSchema));

// ------------------------------------------ Services ------------------------------------------ //
module.exports.addUser = function (newUser, callback) {
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  newUser.save(callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};
