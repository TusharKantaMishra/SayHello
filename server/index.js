const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];

app.use(cors());
app.get('/',function (req,res) {
    res.send('Hello World');
})

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('User connected');

    socket.on('joined', ({user})=>{
        users[socket.id] = user;
        console.log(user, 'joined');
        socket.broadcast.emit('user joined', {user:'Admin', message:`${users[socket.id]} joined the chat`})
        socket.emit('welcome', {user:'Admin', message:`Welcome to the chat ${users[socket.id]}`})
    })

    socket.on('message', ({message,id})=>{
        io.emit('sendMessage', {user: users[id], message, id});
    })

    socket.on('disconnect', ()=>{
        console.log(`${users[socket.id]} disconnected`);
    })

})

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})
