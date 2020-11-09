const express = require('express');
const path = require('path');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001;
const User = require('./models/user.js');
const Todo = require('./models/todo');

// Creating express app and configuring middleware needed for authentication
const app = express();
// allow CORS
// const cors = require('cors');
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({
  name: 'session-id',
  secret: '123-456-789',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// local strategy for User
passport.use('user-local', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set up mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'))

// Defining routes here
app.use(userRouter);
app.use(todoRouter);

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
