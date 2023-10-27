const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./routes/auth");

// making donEnv ready to use
dotenv.config();

// connection to DB
const connectDB = require("./db/connectDB");

// middleware
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common")); // used to indicate request and related info

// view engine
app.set("view engine", "ejs");

app.use("/api/authentication", authRouter);

//routers
// app.get("/", (req, res) => res.render("home"));
app.get("/imagesAuth", (req, res) => res.render("imagesAuth"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));

// port
const port = process.env.PORT || 5000;

// initializing server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  } catch (error) {
    console.log(error);
  }
};

start();
