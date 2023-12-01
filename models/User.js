const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;

// TODO: change watchlist prop to an array of coin _ids
// TODO: can use #match for the email validator: https://mongoosejs.com/docs/validation.html

const userSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  googleid: String,
  facebookid: String,
  name: { type: String, trim: true },
  password: {
    type: String,
  },
  watchList: {
    //An array of coin objects
    type: Array,
  },
});

// passport plugins
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// returns true if the password param matches the hashed password of the user this method is called on
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
};

const User = (module.exports = mongoose.model("User", userSchema));

// ------------------------------------------ Services ------------------------------------------ //

// takes a user object and adds it to the collection of users
module.exports.addUser = function (newUser, callback) {
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  return newUser.save(callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  return User.findOne(query, callback);
};

module.exports.changeUserPassword = function (
  id,
  oldPassword,
  newPassword,
  callback
) {
  User.findById(id, async (err, user) => {
    if (err) throw err;

    const isMatch = await user.isValidPassword(oldPassword);
    if (isMatch) {
      user.password = bcrypt.hashSync(newPassword, 10);
      user.save(
        callback(null, {
          success: true,
          message: "Password successfully changed",
        })
      );
    } else {
      callback(null, { success: false, message: "Invalid password!" });
    }
  });
};

module.exports.deleteUserById = function (id, password, callback) {
  User.findById(id, async (err, user) => {
    if (err) throw err;

    const isMatch = await user.isValidPassword(password);
    if (isMatch) {
      User.deleteOne({ _id: id })
        .then(
          callback(null, {
            success: true,
            message: "User successfully deleted",
          })
        )
        .catch((err) => {
          console.log(err);
          callback(err, {
            success: false,
            message: "Error while trying to delete user in database",
          });
        });
    } else {
      callback(null, { success: false, message: "Invalid password!" });
    }
  });
};
