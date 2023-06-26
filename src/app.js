import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4001;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static('src/ui'));


let buttonState1 = false;
let buttonState2 = false;
let buttonState3 = false;
let buttonState4 = false;

io.on('connection', socket => {
    console.log('New Connection');

    io.to(socket.id).emit('buttonState1', buttonState1);
    io.to(socket.id).emit('buttonState2', buttonState2);
    io.to(socket.id).emit('buttonState3', buttonState3);
    io.to(socket.id).emit('buttonState4', buttonState4);

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('buttonState1', value => {
        console.log('buttonState1:', value);
        buttonState1 = value;
        socket.broadcast.emit('buttonState1', value);
    });

    socket.on('buttonState2', value => {
        console.log('buttonState2:', value);
        buttonState2 = value;
        socket.broadcast.emit('buttonState2', value);
    });

    socket.on('buttonState3', value => {
        console.log('buttonState3:', value);
        buttonState3 = value;
        socket.broadcast.emit('buttonState3', value);
    });
    socket.on('buttonState4', value => {
        console.log('buttonState4:', value);
        buttonState4 = value;
        socket.broadcast.emit('buttonState4', value);
    });
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});
