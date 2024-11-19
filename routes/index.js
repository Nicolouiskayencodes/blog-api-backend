const router = require('express').Router();
const passport = require('passport');
const controller= require('../controllers')

const authenticate = passport.authenticate('jwt', { session: false })

router.get("/", controller.postController.indexRoute);
router.post("/register", controller.userController.createUser);
router.post("/login", controller.userController.login);
router.get("/protected", authenticate, controller.postController.protectedRoute);
router.get("/posts", controller.postController.getPosts);
router.post("/post", authenticate, controller.postController.postPost)
router.put("/admin", authenticate, controller.userController.grantAdmin)
router.post("/comment/:id", authenticate, controller.commentController.leaveComment)
router.put("/publish/:id", authenticate, controller.postController.publishPost)
router.delete("/comment/:id", authenticate, controller.commentController.deleteComment)
router.delete("/post/:id", authenticate, controller.postController.deletePost)
router.put("/comment/:id", authenticate, controller.commentController.updateComment)
router.put("/post/:id", authenticate, controller.postController.updatePost)

module.exports = router;