// const express = require('express');
// const cors = require('cors');
// const PORT = process.env.PORT || 8080;
// const app = express();
// const userRoute = require('./routes/userRoute')

// require('dotenv').config();

// app.use(express.json());
// app.use(cors());
// app.use('/user', userRoute)

// app.listen(
//   PORT,
//   console.log(`listening on ${PORT}`)
// )

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const secretKey = 'a752e1933bee9144efbdbeff2b831345f8843c125ce6af70840f4106ef6fad90'

function authorize(req, res, next) {

  const {authorization} = req.headers
  const token = authorization.split(" ")[1];
  // console.log(req.headers)

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(403)
      .json({ success: false, message: 'No Token.'})
    } else {
      req.decoded = decoded;
      
    }
    next()
  })
  // STEP 2: Logic for getting the token and
  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point and respond with an error status code.
}

const users = {};

// Some Basic Sign Up Logic. Take a username, name,
// and password and add it to an object using the
// provided username as the key
app.post('/signup', (req, res) => {
  const { username, name, password } = req.body;
  users[username] = {
    name,
    password, // NOTE: Passwords should NEVER be stored in the clear like this. Use a
    // library like bcrypt to Hash the password. For demo purposes only.
  };
  res.json({ success: 'true' });
});

// A Basic Login end point
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
      const token = jwt.sign({name:user.name, username }, secretKey);

      res.json({token})
    // STEP 1: When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their name to
    // the token. Send the token back to the client.
  }
});

// A Profile end-point that will return user information,
// in this example, the user's name that they provided
// when they signed up.
// The authorize middleware function must check for
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
app.get('/profile', authorize, (req, res) => {
  res.json(req.decoded);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
