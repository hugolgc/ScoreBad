const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const randomstring = require('randomstring')


let screens = []
let matchs = []


app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => res.render('viewer'))
app.get('/control', (req, res) => res.render('controller'))


io.on('connection', socket => {
  console.log(randomstring.generate(6))
  socket.on('disconnect', () => console.log('leave user'))
})


server.listen(80, () => console.log('server start'))