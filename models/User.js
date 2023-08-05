const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  facebookId: String,
});

mongoose.model("users", userSchema);
