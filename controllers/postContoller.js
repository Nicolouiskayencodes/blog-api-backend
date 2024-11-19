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
  console.log('postpost')
  if (req.user.admin){
    console.log(req.body)
    await db.postPost(req.user.id, req.body.title, req.body.content)
    return res.status(200).json({message: "post created"})
  } else {
    return res.status(403).json({message: "You do not have persmission to create posts"})
  }
}

module.exports = {indexRoute, protectedRoute, getPosts, postPost}