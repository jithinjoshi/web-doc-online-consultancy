
import { Conversation } from "../Model/Conversation.js";

// conversation controller

export const newConversation = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;

    const newConvs = await new Conversation({ members: [recieverId, senderId] });
    await newConvs.save();

    return res.status(500).send({ success: true, message: 'Conversation Created Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: true, message: 'Internal Server Error' });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.find({
      members: { $in: [id] },
    });
    return res.status(200).send({ success: true, message: 'get conversation successfull', conversation });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};