import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import user from './routes/user.js'

dotenv.config();

const port = process.env.PORT || 3000;
const ChatPort = process.env.CHATPORT;
const mongoDB = process.env.MONGODBURI;

app.use('/', user)

const server = http.createServer(app); // creating a http server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}); //new instance of server

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`); // will console log if user is connected
  socket.on('send_message', (data) => {
    socket.broadcast.emit('received_message', data); // will broadcast the message other than the sender
  }); //listen to an emmitted message on 'send_message'

  socket.on('join', async (data) => {
    await socket.join(data); // specifying an id for a room
    console.log(socket.rooms);
  });

  socket.on('send', (data) => {
    socket.to(data.room).emit('rec', data); //the message sends
  });
});

server.listen(ChatPort, () => {
  console.log(`Chat App: ${ChatPort}`);
});

mongoose.connect(mongoDB).then(() => {
  app.listen(port, () => {
    console.log(`Server Connected  at port:${port}`);
  });
});
