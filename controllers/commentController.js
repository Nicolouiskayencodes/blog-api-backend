const db = require('../db/queries.js')


const leaveComment = async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.id;
  await db.createComment(postId, userId, req.body.content);
  return res.status(200).json({message: "Comment created."});
}

const deleteComment = async (req, res) => {
  const comment = await db.getComment(parseInt(req.params.id));
  if (req.user.admin === true || req.user.id === comment.authorId){
    await db.deleteComment(parseInt(req.params.id));
    return res.status(200).json({message: "Comment deleted"})
  } else {
    return res.status(403).json({message: "You do not have permission to delete comments"})
  }
}

const updateComment = async (req, res) => {
  const comment = await db.getComment(parseInt(req.params.id));
  if (req.user.id === comment.authorId) {
    await db.updateComment(parseInt(req.params.id), req.body.content)
  return res.status(200).json({message: "Comment updated"})
  } else {
    return res.status(403).json({message: "You do not have permission to update comments"})
  }
}

module.exports = {leaveComment, deleteComment, updateComment}