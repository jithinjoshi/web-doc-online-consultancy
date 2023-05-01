import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Server } from "socket.io";


import { database } from './Database/connection.js';
import userRouter from './router/user.js';
import adminRouter from './router/admin.js';
import doctorRouter from './router/doctor.js'
import messageRouter from './router/message.js'



const PORT = process.env.PORT;
const app = express();



//database
database();

//middlewares
app.use(cors({ origin: true, credentials: true, origin: "http://localhost:3000" }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('combined'));
app.use(cookieParser())

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.raw({ type: "application/json" }));

app.use(bodyParser.json());


app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/message', messageRouter)



const server = app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },

});

//socket
// const server = http.createServer();
// const io = new Server(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         credentials:true
//     },
// });



global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("connect user");
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg)
        }
    })
})