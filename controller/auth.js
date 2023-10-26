const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");

const handelError = (error) => {
  // console.log(error.message)
  let userInputErrors = { email: "", password: "" };

  //checking for duplicate email
  if (error.code === 11000) {
    userInputErrors.email = "This email is already registered";
    return userInputErrors;
  }

  //validations for an email and password
  if (error.message.includes("user validation failed")) {
    const errorObjects = Object.values(error.errors);
    errorObjects.forEach(({ properties }) => {
      userInputErrors[properties.path] = properties.message;
    });
  }

  return userInputErrors;
};

// register user
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ ...req.body });
    res.send(user);
  } catch (error) {
    const userErrors = handelError(error);
    console.log(userErrors);
    res.status(404).json(userErrors);
  }
};

// login user
const login = async (req, res) => {
  console.log("user log-in");
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   throw new BadRequestError("please provide email and password");
  // }
  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw new UnauthenticatedError("Invalid Credentials");
  // }
  // const passwordMatchTrue = await user.comparePassword(password);
  // if (!passwordMatchTrue) {
  //   res.status(StatusCodes.BAD_REQUEST).json("You have entered wrong password");
  //   throw new UnauthenticatedError("Wrong Password");
  // }
  // res.status(StatusCodes.OK).json({
  //   user,
  // });
};

module.exports = { register, login };
