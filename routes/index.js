const router = require('express').Router();
const passport = require('passport');
const controller= require('../controllers')
const cors = require('cors')

const authenticate = passport.authenticate('jwt', { session: false })

router.options('/*', cors())

router.get("/", cors(), controller.postController.indexRoute);
router.post("/register", cors(), controller.userController.createUser);
router.post("/login", cors(), controller.userController.login);
router.get("/protected", cors(), authenticate, controller.postController.protectedRoute);
router.get("/posts", cors(), controller.postController.getPosts);
router.post("/post", cors(), authenticate, controller.postController.postPost)
router.put("/admin", cors(), authenticate, controller.userController.grantAdmin)
router.post("/comment/:id", cors(), authenticate, controller.commentController.leaveComment)
router.put("/publish/:id", cors(), authenticate, controller.postController.publishPost)
router.delete("/comment/:id", cors(), authenticate, controller.commentController.deleteComment)
router.delete("/post/:id", cors(), authenticate, controller.postController.deletePost)
router.put("/comment/:id", cors(), authenticate, controller.commentController.updateComment)
router.put("/post/:id", cors(), authenticate, controller.postController.updatePost)

module.exports = router;