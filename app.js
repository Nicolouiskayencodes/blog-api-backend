const express = require('express');
const routes = require('./routes')
const bodyParser = require('body-parser')
require('dotenv').config();
require('./config/passport')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(routes)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({error: err});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(' Message Board - listening on port '+PORT+'!'));