import React, { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { getMessages, getsingleUser, newMessages } from '../../../Helpers/doctorHelper';
import SelectedUser from './SelectedUser';
import Welcome from './Welcome';
import { format } from 'timeago.js';

const Messages = ({ chat, currentUserId, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.conversationId === chat._id) {
      setMessages([...messages, recieveMessage])
    }
  }, [recieveMessage]);

  // Fetch data
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
        if (chat) {
          const data = await getMessages(chat._id);
          setMessages(data?.data?.messages);
        }
      } catch (error) {
        return error;
      }
    };
  
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);
  

  const handleChange = (e) => {
    setNewMessages(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUserId,
      text: newMessage.trim(),
      conversationId: chat?._id,
    };
  
    try {
      const { data } = await newMessages(message);
      setNewMessages('');
      setMessages((prevMessages) => [...prevMessages, data?.messages]);
    } catch (error) {
      return error;
    }
  
    const recieverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, recieverId });
  };
  

  
  

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {userData ? (
        <>
          <SelectedUser userData={userData} />
          <div class="basis-4/6 mb-20">
            <div class="">
              <div className="message-area mt-4 px-4">
                {messages.map((message, index) => {
                  return (
                    <div key={index} ref={index === messages.length - 1 ? scroll : null}>
                      {message?.sender === currentUserId ? (
                        <div className="send-chat flex justify-end">
                          <div className="px-5 mb-2 bg-gray-200 text-slate-500 py-2 text-sm max-w-[80%] rounded font-light">
                            <p>{message?.text}</p>
                            <span className="text-xs text-gray-400">{format(message?.createdAt)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="receive-chat flex justify-start">
                          <div className="px-5 mb-2 bg-violet-400 text-white py-2 text-sm max-w-[80%] rounded font-light">
                            <i className="fa fa-caret-up text-violet-400 -top-2 absolute"></i>
                            <p>{message?.text}</p>
                            <span className="text-xs text-white-400">{format(message?.createdAt)}</span>
                          </div>
                        </div>
                      )}
                    </div>
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
