import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

import React, { useEffect, useState } from 'react';
import Users from './Users';
import Search from './Search';
import Messages from './Messages';
import { getAllConversations} from '../../../Helpers/userHelper';


const Body = () => {
  const [chats,setChats] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [sendMessage,setSendMessage] = useState(null);
  const [recieveMessage,setRecieveMessage] = useState(null);

  const socket = useRef();



  //get all doctors
  const {user} = useSelector((state)=>state.user);

   //send message
   useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit('send-message',sendMessage)
    }
  },[sendMessage]);

  //socket
  useEffect(()=>{
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add",user?._id);
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
    })
  },[user])

   //recieve message
   useEffect(()=>{
    socket.current.on('recieve-message',(data)=>{
      setRecieveMessage(data)
    })
  },[])
  
  useEffect(()=>{
    const getAllChats = async()=>{
      try {
        const {data} = await getAllConversations(user?._id);
        setChats(data?.conversation);
        
      } catch (error) {
       
        return error;
        
      }
    }
    getAllChats()
  },[user]);


  


  const checkOnlineStatus = (chat)=>{
    const chatMember = chat.members.find((member)=>member !== user._id);
    const online = onlineUsers.find((user)=>user.userId === chatMember);
    return online ? true : false;
  }

    return (
    
      <div class="messanger p-4 bg-white min-h-screen overflow-hidden flex flex-col sm:flex-row">
        <div class="sm:basis-2/6 sm:pt-3 bg-white border-r border-slate-100">
          <div class="">
            <Search />
            {
              chats?.map((chat)=>{
                return(
                  <div onClick={()=>setCurrentChat(chat)}>
                  <Users data={chat} currentUserId = {user?._id} online={checkOnlineStatus(chat)}/>
                  </div>
                )
                
              })
            }
            
          </div>
        </div>
        <div className="basis-4/6">
          <div className="">
            
            <Messages chat={currentChat} currentUserId={user?._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
  
  
          </div>
        </div>
      </div>
    );


  
};

export default Body;
