import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import messagesRout from './routes/messagesRout.js'
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/messages', messagesRout);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port https://lettalk-msdu.onrender.com:${process.env.PORT}`);
});

// Instance of the Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'https://letstalkk.vercel.app',
    credentials: true
  }
});

global.onlineUsers = new Map(); // Stores all the online users inside the map

// Whenever there is a connection, store the chatSocket inside the global chatSocket
io.on('connection', (socket) => {
  console.log("New Connection");
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    console.log("sendMsg", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
