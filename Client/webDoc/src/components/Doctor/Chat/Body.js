import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import { useRef } from 'react';

import React, { useEffect, useState } from 'react';
import Users from './Users';
import Search from './Search';
import SelectedUser from './SelectedUser';
import Messages from './Messages';
import Input from './Input';
import { selectUser } from '../../../Redux/Doctor/doctorSlice';
import { getAllConversations, newMessages,getMessages } from '../../../Helpers/doctorHelper';


const Body = () => {
  const [chats,setChats] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([])
  const socket = useRef();

  

  //get all doctors
  const {doctor} = useSelector((state)=>state.doctor);

  //socket
  useEffect(()=>{
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add",doctor?._id);
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
    })
  },[doctor])
  
  useEffect(()=>{
    const getAllChats = async()=>{
      try {
        const {data} = await getAllConversations(doctor?._id);
        setChats(data?.conversation);
        console.log(data?.conversation);
        
      } catch (error) {
        console.log(error);
        return error;
        
      }
    }
    getAllChats()
  },[doctor])



    return (
    
      <div class="messanger p-4 bg-white min-h-screen overflow-hidden flex flex-col sm:flex-row">
        <div class="sm:basis-2/6 sm:pt-3 bg-white border-r border-slate-100">
          <div class="">
            <Search />
            {
              chats?.map((chat)=>{
                return(
                  <div onClick={()=>setCurrentChat(chat)}>
                  <Users data={chat} currentUserId = {doctor?._id}/>
                  </div>
                )
                
              })
            }
            
          </div>
        </div>
        <div className="basis-4/6">
          <div className="">
            
            <Messages chat={currentChat} currentUserId={doctor?._id}/>
  
  
          </div>
        </div>
      </div>
    );


  
};

export default Body;
