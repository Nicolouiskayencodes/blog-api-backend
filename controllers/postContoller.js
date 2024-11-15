

const indexRoute = (req, res) => {
  res.json({message:"hello express server"})
}

const protectedRoute = (req,res) => {
  return res.status(200).json(req.user)
}

module.exports = {indexRoute, protectedRoute}