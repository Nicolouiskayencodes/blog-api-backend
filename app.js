const express = require('express');
const jwt = require("jsonwebtoken");
const passport = require("passport");
require('dotenv').config();
require('./config/passport')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const authenticate = passport.authenticate('jwt', { session: false })

app.get("/", (req, res) => {
  res.json({message:"hello express server"})
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // change to database retrieve
  if (username === 'nico') {
    if (password === '123') {
      const user = {
        username: 'nico',
        id: '1',
        password: '123',
      }
      const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '5m' }) 

        return( res.status(200).json({
          message: "Auth Passed",
          token
        })
    );
    }
  }
  return res.status(401).json({ message: "Auth Failed" })
});

app.get("/protected", authenticate, (req, res) => {
  return res.status(200).send("YAY! this is a protected Route")
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({error: err});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(' Message Board - listening on port '+PORT+'!'));