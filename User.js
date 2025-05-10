const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
    enum: ["student", "admin"],
  },
  class: {
    type: String,
    enum: ["MCA", "MBA"],
    required: function () {
      return this.profile === "student";
    },
  },
  facultyId: {
    type: String,
    required: function () {
      return this.profile === "admin";
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
