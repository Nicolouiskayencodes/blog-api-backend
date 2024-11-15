const router = require('express').Router();
const passport = require('passport');
const controller= require('../controllers')

const authenticate = passport.authenticate('jwt', { session: false })

router.get("/", controller.postController.indexRoute)

router.post('/register', controller.userController.createUser)

router.post("/login", controller.userController.login);

router.get("/protected", authenticate, controller.postController.protectedRoute)

module.exports = router;