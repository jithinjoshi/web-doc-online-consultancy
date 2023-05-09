import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Doctor/doctorSlice';
import { addMessage, getAllConversations, getMessages, getsingleUser, newMessages } from '../../../Helpers/doctorHelper';
import SelectedUser from './SelectedUser';
import Welcome from './Welcome';
import { format } from 'timeago.js'
import Input from './Input';

const Messages = ({ chat, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState("")

  // fetch data;
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const user = await getsingleUser(userId);
        setUserData(user?.data);
      } catch (error) {
        return error;
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(chat?._id);
        setMessages(data?.data?.messages);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (e) => {
    setNewMessages(e.target.value);

  }

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      sender:currentUserId,
      text:newMessage,
      conversationId:chat?._id
    }

    try {
      const {data} = await newMessages(message);
      console.log(data);
      setMessages([...messages,data?.messages]);
      setNewMessages('');
    } catch (error) {
      console.log(error);
      return error;
    }

  }


  return (
    <>
      {userData ? (
        <>
          <SelectedUser userData={userData} />
          <div class="basis-4/6">
            <div class="">
              <div class="message-area mt-4 px-4">
                {messages.map((message) => {
                  return (
                    <>
                      {message?.senderId === currentUserId ? (
                        <div class="relative receive-chat flex justify-start">
                          <div class="px-5 mb-2 bg-violet-400 text-white py-2 text-sm max-w-[80%] rounded font-light">
                            <i class="fa fa-caret-up text-violet-400 -top-2 absolute"></i>
                            <p>{message?.text}</p>
                            <span class="text-xs text-gray-400">{new Date(message?.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      ) : (
                        <div class="send-chat flex justify-end">
                          <div class="px-5 mb-2 bg-violet-200 text-slate-500 py-2 text-sm max-w-[80%] rounded font-light">
                            <p>{message?.text}</p>
                            <span class="text-xs text-gray-400">{format(message?.createdAt)}</span>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              {/* input */}
              <div className="bg-gray-100 fixed bottom-0 w-2/3 pl-4 mb-3 flex flex-row justify-between items-center">
                <input
                  className="w-full bg-gray-100 pt-3 mb-3 focus:outline-none font-light"
                  placeholder="Write a message"
                  onChange={handleChange}
                  value={newMessage}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-full mr-3" onClick={handleSend}>
                  <FiSend size={24} color="white" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Messages;