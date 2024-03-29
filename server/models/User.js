const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const { validateEmail } = require("./../utils");

const { Schema } = mongoose;

const userSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email required"],
    unique: true,
    validate: {
      validator: validateEmail,
      message: "Please enter a valid email",
    },
  },
  googleid: String,
  facebookid: String,
  name: { type: String, trim: true },
  password: {
    type: String,
  },
  watchlist: {
    type: [Schema.Types.ObjectId],
  },
});

// passport plugins
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// returns true if the password param matches the hashed password of the user this method is called on
userSchema.methods.validatePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.saveNewPassword = async function (newPassword) {
  const user = this;
  user.password = bcrypt.hashSync(newPassword, 10);
  await user.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// ------------------------------------------ Services ------------------------------------------ //

// takes a user object and adds it to the collection of users
module.exports.addUser = function (newUser) {
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  return newUser.save();
};

module.exports.deleteUserById = async function (id, password) {
  const user = await User.findById(id);
  const isMatch = user.validatePassword(password);
  if (!isMatch) {
    return { success: false, message: "Invalid password!" };
  }

  await User.deleteOne({ _id: id });
  return {
    success: true,
    message: "User successfully deleted",
  };
};
