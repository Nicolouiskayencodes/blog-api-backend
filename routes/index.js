const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const controller= require('../controllers')

const authenticate = passport.authenticate('jwt', { session: false })

router.get("/", controller.indexRoute)

router.post('/register', controller.userController.createUser)

router.post("/login", controller.userController.login);

router.get("/protected", authenticate, (req, res) => {
  return res.status(200).json(req.user)
})

module.exports = router;