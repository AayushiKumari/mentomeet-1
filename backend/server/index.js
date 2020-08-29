import path from 'path'
import http from 'http'
import express  from 'express'
import dotenv from 'dotenv'
import bodypParser from 'body-parser'
import cookieParser from 'cookie-parser'
import socketio from 'socket.io'
import morgan from 'morgan'
import bookingRouter from './routes/bookings/index.js'

import signUpRouter from './routes/auth/signUp/index.js'
import signInrouter from './routes/auth/signIn/index.js'
import signOutRouter from './routes/auth/signOut/index.js'

import quoraRouter from './routes/quora/index.js'
import chatRouter from './routes/chat/index.js'
import {addUser, removeUser, getUser, getUsersInRoom} from './controllers/chat/users.js'

// var quoraRouter = require('./routes/quora/quora.route.js');

import ExpressValidator from 'express-validator'

const __dirname = path.resolve() // why __dirname is not working 
dotenv.config({path:path.resolve(__dirname , '.env')}) 
const port  = process.env.PORT || 5005


const app = express()
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

//third party middlwares 
app.use(bodypParser.json())
app.use(bodypParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(morgan('dev'))

//to allow Cross origin requests!
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST")
    next()
    })

app.use(bookingRouter)
app.use(ExpressValidator())  //validations of input by user , for example email validations and non-empty password validationss
app.use(signUpRouter)
app.use(signInrouter)
app.use(signOutRouter)
app.use(quoraRouter)
app.use(chatRouter)

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });
  

app.listen(port, ()=> console.log("listenig at " + port))