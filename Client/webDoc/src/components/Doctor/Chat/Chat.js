import { useSelector } from "react-redux";
import Chats from "./Chats";
import Users from "./Users";
import { selectUser } from "../../../Redux/Doctor/doctorSlice";
import { useEffect, useState, useRef } from "react";
import { addMessage, chatUser, getAllMessages } from "../../../Helpers/doctorHelper";
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

const ChatsPage = () => {
    const host="http://localhost:8080/"
    const socket = useRef()
    const user = useSelector(selectUser);
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({});
    const [chats, setChats] = useState();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef()





    // useEffect(() => {
    //     if (user) {
    //         socket.current = io('http://localhost:8080/');
    //         socket.current.emit("add-user", user._id)
    //     }
    // }, [user])

    useEffect(() => {
        if (user && user._id) {
            chatUser(user._id).then((users) => {
                setUsers(users?.data);
            });
        }
    }, [user])

    useEffect(async () => {
        const response = await getAllMessages({ from: user?._id, to: selectedUser?.userId });
        setMessages(response.data)
    }, [selectedUser]);

    useEffect(async () => {
        const data = await addMessage({
            from: user?._id,
            to: selectedUser?.userId,
            message: chats
        })

    }, [chats])

    useEffect(() => {
        if (user) {
            socket.current = io(host);
            socket.current.emit("add-user", user._id);
        }
    }, [user]);

    useEffect(() => {
        if (socket.current) {
            socket.current.emit("send-msg", {
                to: selectedUser?.userId,
                from: user?._id,
                messages: chats
            });
        }
    }, [chats, selectedUser, user]);

    const msgs = [...messages];
if (chats && chats !== msgs[msgs.length - 1]?.message) {
  const updatedChats = Array.from(chats);
  updatedChats.push({ fromSelf: true, message: chats });
  setChats(updatedChats);
  setMessages(msgs);
}

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: chats })
            })
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="container mx-auto">
            <div className="min-w-full border rounded lg:grid lg:grid-cols-3 h-full w-full mt-2 overflow-y-hidden">
                <Users users={users} setSelectedUser={setSelectedUser} />
                <Chats selectedUser={selectedUser} chats={chats} setChats={setChats} messages={messages} socket={socket} scrollRef={scrollRef} uuidv4={uuidv4} />
            </div>
        </div>
    )
};
export default ChatsPage;