import express, { json } from 'express';
import initializeDatabase from './db/index.js';
import cors from 'cors';
import colors from 'colors';
import authRouter from './routes/Auth.route.js';
import userRoutes from './routes/User.route.js';
import chatRoutes from './routes/Chat.route.js';
import messageRoutes from './routes/Message.route.js';
import { Server } from 'socket.io';
initializeDatabase();
const app = express();
app.use(json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/api/v1', authRouter);
app.use('/api/v1', userRoutes);
app.use('/api/v1/user/chat', chatRoutes);
app.use('/api/v1/message', messageRoutes);

// socket io connection
const server = app.listen(PORT, () =>
  console.log(`Server Started On ${PORT}`.underline.bold.bgBlue)
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3001',
  },
});

io.on('connection', (socket) => {
  console.log('connection to socket.io ==============');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });
  socket.on('join-chat', (room) => {
    socket.join(room);
    console.log('User join Room', room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));

  socket.on('stop-typing', (room) => socket.in(room).emit('stop-typing'));

  socket.on('new-message', (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat?.users) return console.log('chat user not found');

    chat?.users?.forEach((user) => {
      if (user?._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit('message-received', newMessageReceived);
    });
  });
  socket.off('setup', (userData) => {
    console.log('User discounted');
    socket.leave(userData._id);
  });
});
