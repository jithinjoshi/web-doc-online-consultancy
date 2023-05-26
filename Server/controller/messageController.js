
import { Message } from '../Model/Message.js';

export const newMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMsg = new Message({ conversationId, sender, text });
    const messages = await newMsg.save();
    return res.status(200).send({ success: true, message: 'New Message Successful', messages });
  } catch (error) {
    
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ conversationId: id });
    return res.status(200).send({ success: true, message: 'Get Message Successful', messages });
  } catch (error) {

    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};