const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   require: [true, "Please provide username"],
    //   // match: ["regex here so as to remove space between name"],
    //   minLength: 3,
    //   maxLength: 50,
    //   unique: true,
    // },
    // firstName: {
    //   type: String,
    //   minLength: 1,
    //   maxLength: 15,
    // },
    // lastName: {
    //   type: String,
    //   minLength: 1,
    //   maxLength: 15,
    // },
    email: {
      type: String,
      require: [true, "Pease Provide email"],
      unique: true,
      // unique: [true, "This email is already taken, please use another"],
      lowercase: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      require: [true, "Please provide you password"],
      minlength: [6, "Minimum password length is 6 characters"],
      // match: [
      //   "^(?=.*[A-Za-z](?=.*d) [A-Za-zd]{8,}$)",
      //   "Password must contain minimum eight character, at least one letter and one number",
      // ],
    },
  },

  { timestamps: true }
);

// used by the register route to encrypt password automatically
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// used by the login route to compare password after password is provided
userSchema.methods.comparePassword = async function (candidatePassword) {
  const matchTrue = await bcrypt.compare(candidatePassword, this.password);
  return matchTrue;
};

module.exports = mongoose.model("user", userSchema);
