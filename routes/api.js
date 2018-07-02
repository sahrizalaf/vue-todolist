const express = require('express')
const routes = express.Router()
const models = require('../models/index')
const Task = models.Tasks

routes.get('/', (req, res) => {
  res.send('Welcome to API!')
})

routes.get('/tasks/', (req, res) => {
  Task.findAll({})
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})

routes.post('/tasks/', (req, res) => {
  Task.create({
      title: req.body.title,
      done: req.body.done
    })
    .then(task => res.json(task))
    .catch(err => res.json(err))
})

routes.put('/task/:id', (req, res) => {
  Task.update(req.body, {
    where: { id: req.params.id }
  })
  .then( task => res.json(task) )
  .catch( err => res.json(err) )
})

routes.delete('/task/:id', (req, res) => {
  Task.destroy({
    where: { id: req.params.id }
  })
  .then( task => res.json(task) )
  .catch( err => res.json(err) )
})

module.exports = routes