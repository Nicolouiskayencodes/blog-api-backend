const userController = require('./userController.js')

const indexRoute = (req, res) => {
  res.json({message:"hello express server"})
}

module.exports = {indexRoute, userController}