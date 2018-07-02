const express = require('express')
const app = express()
const routes = require('./routes/api')
const models = require('./models/index')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cors())
app.use('/api', routes)

app.listen('3000', () => {
  models.sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
      console.log("Server running on port 3000!")
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
})