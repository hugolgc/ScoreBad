const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const randomstring = require('randomstring')
let screens = []

const getCode = (io) => {
  let code = null
  do {
    code = randomstring.generate(4).toUpperCase()
  } while (screens.includes(code))
  io.emit('setCode', code)
}

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => res.render('viewer'))
app.get('/control', (req, res) => res.render('controller'))


io.on('connection', socket => {

  getCode(io)

  socket.on('setViewer', data => io.emit('setViewer', data))
  socket.on('setController', data => io.emit('setController', data))
  socket.on('setData', data => io.emit('setData', data))
  
  socket.on('disconnect', () => console.log('leave user'))

})


server.listen(process.env.PORT || 80)