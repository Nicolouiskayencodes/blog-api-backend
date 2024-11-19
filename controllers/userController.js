const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/queries.js');

const createUser = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    try {
      await db.createUser(req.body.username, hashedPassword)
      return res.status(200).json({message: "User created"})
    } catch(err) {
      return next(err);
    }
  })
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUser(username);
  if (!user) {
    return res.status(404).json({message: "User not found"})
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '24h' }) 

    return( res.status(200).json({
      message: "Auth Passed",
        token
      })
    );
    
  }
  return res.status(401).json({ message: "Auth Failed" })
};

const grantAdmin = async (req, res) => {
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    await db.grantAdmin(req.user.id)
    return res.status(200).json({message: "You are now an admin"})
  } else {
    return res.status(403).json({message: "Not authorized"})
  }
}

module.exports = {createUser, login, grantAdmin}