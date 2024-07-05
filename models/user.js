const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

/// this is going to add a field for username and password for our schema
/// it assures that the username is unique
/// gives us additional methods that we can use
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);



