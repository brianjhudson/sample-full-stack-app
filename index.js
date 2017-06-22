const express = require('express')
const cors = require('cors')
const session = require('express-session')
const {json} = require('body-parser')
const massive = require('massive')

const config = require('./config')
const app = express()

massive(config.connectionString)
.then(function(db) {
   app.set('db', db)
   db.createPlayersTable()
   .then(result => {
      console.log(result)
   })
   db.createTeamsTable()
   .then(result => {
      console.log(result)
   })
   db.createPlayerTeamsTable()
   .then(result => {
      console.log("Players & Teams")
   })
})
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(json())
app.use(session({
   secret: config.secret,
   saveUninitialized: true,
   resave: false
}))

app.get('/api/players', function(req, res, next) {
   const db = req.app.get('db')
   db.getPlayers()
   .then(players => {
      res.status(200).json(players)
   })
   .catch(err => {
      res.status(500).json(err)
   })
})
app.get('/api/teams', function(req, res, next) {
   const db = req.app.get('db')
   db.getTeams()
   .then(teams => {
      res.status(200).json(teams)
   })
   .catch(err => {
      res.status(500).json(err)
   })

})

app.post('/api/players', function(req, res, next) {
   const db = req.app.get('db')
   const {name, nickname, rank} = req.body
   db.createPlayer([name, nickname, rank])
   .then(results => {
      res.status(200).json(results)
   })
   .catch(err => {
      res.status(500).json(err)
   })
})
app.post('/api/teams', function(req, res, next) {
   const db = req.app.get('db')
   const {team_name} = req.body
   db.createTeam([team_name])
   .then(results => {
      res.status(200).json(results)
   })
   .catch(err => {
      res.status(500).json(err)
   })
})


app.listen(3000, () => {
   console.log("Jacob is listening")
})