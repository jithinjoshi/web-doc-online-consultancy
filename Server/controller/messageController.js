// import { Message } from "../Model/Message.js";

// export const addMessage = async (req, res, next) => {
//     try {
//         const { from, to, message } = req.body;

//         const data = await Message.create({
//             message: {
//                 text: message,
//                 users: [from, to],
//                 sender: from,
//             },
//         });


//         if (data) return res.json({ msg: "message added successfully." });
//         return res.json({ msg: "Failed to add message to database" })
//     } catch (error) {
//         next(error)

//     }
// }

// export const getAllMessage = async (req, res, next) => {
//     try {
//         const { from, to } = req.body;
//         console.log(from, to);

//         const messages = await Message.find({
//             'message.users': { $all: [String(from), String(to)] }
//         }).sort({ updatedAt: 1 });

//         console.log(messages);

//         const projectMessages = messages.map((msg) => {
//             return {
//                 fromSelf: msg.message.sender.toString() === from,
//                 message: msg.message.text,
//             };
//         });

//         console.log(projectMessages,"OOOOOOOOOOOOOOOOOO");

//         res.json(projectMessages);

//     } catch (error) {
//         next(error)

//     }
// }



import { Message } from '../Model/Message.js';

export const newMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMsg = new Message({ conversationId, sender, text });
    const messages = await newMsg.save();
    return res.status(200).send({ success: true, message: 'New Message Successful', messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ conversationId: id });
    return res.status(200).send({ success: true, message: 'Get Message Successful', messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};