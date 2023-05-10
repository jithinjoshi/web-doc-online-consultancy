const io = require('socket.io')(8800,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let activeUsers = [];
io.on("connection",(socket)=>{


socket.on('new-user-add',(newUserId)=>{
    if(!activeUsers.some((user)=>user?.userId === newUserId)){
        activeUsers.push({
            userId:newUserId,
            socketId:socket.id
        })

    }

    console.log("connected users",activeUsers);
    io.emit('get-users',activeUsers)
});

//send message
socket.on("send-message",(data)=>{
    const {recieverId} = data;
    console.log("active users",activeUsers);
    const user = activeUsers.find((user)=> user.userId === recieverId);
    console.log("sending from socket to : ",recieverId);
    console.log("data",data);

    if(user){
        io.emit("recieve-message",data);
        
    }

})



socket.on("disconnect",()=>{
    activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id);
    console.log("user disconnected",activeUsers);
    io.emit('get-users',activeUsers)
})

})

