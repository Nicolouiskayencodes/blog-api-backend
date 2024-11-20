const db = require('../db/queries.js')

const indexRoute = (req, res) => {
  res.json({message:"hello express server"})
}

const protectedRoute = (req,res) => {
  return res.status(200).json(req.user)
}
const getPosts = async (req, res) => {
  const posts = await db.getPosts();
  return res.json(posts)
}
const postPost = async (req, res) => {
  if (req.user.admin){
    await db.postPost(req.user.id, req.body.title, req.body.content)
    return res.status(200).json({message: "post created"})
  } else {
    return res.status(403).json({message: "You do not have persmission to create posts"})
  }
}
const getUnpublished = async (req, res) => {
  if (req.user.admin){
    const posts = await db.getUnpublished();
    return res.json(posts)
  } else {
    return res.status(403).json({message: "You do not have persmission to see unpublished posts"})
  }
}
const publishPost = async (req, res) => {
  if (req.user.admin){
    await db.publishPost(parseInt(req.params.id))
    return res.status(200).json({message: "post published"})
  } else {
    return res.status(403).json({message: "You do not have persmission to publish posts"})
  }
}
const deletePost = async (req, res) => {
  if (req.user.admin) {
    await db.deletePost(parseInt(req.params.id))
    return res.status(200).json({message: "post deleted"})
  } else {
    return res.status(403).json({message: "You do not have persmission to delete posts"})
  }
}
const updatePost = async (req, res) => {
  if (req.user.admin) {
    await db.updatePost(parseInt(req.params.id), req.body.title, req.body.content)
    return res.status(200).json({message: "post updated"})
  } else {
    return res.status(403).json({message: "You do not have persmission to edit posts"})
  }
}

module.exports = {indexRoute, protectedRoute, getPosts, postPost, publishPost, deletePost, updatePost, getUnpublished}