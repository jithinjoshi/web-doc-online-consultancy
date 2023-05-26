
import { Conversation } from "../Model/Conversation.js";

// conversation controller

export const newConversation = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;



    const newConvs = await new Conversation({ members: [recieverId, senderId] });
    await newConvs.save();

    return res.status(200).send({ success: true, message: 'Conversation Created Successfully' });
  } catch (error) {
 
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
    
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};


export const checkExistence = async(req,res)=>{
  try {
    const {senderId,recieverId} = req.body;
    const checkExistence = await Conversation.find({senderId,recieverId});
    if(checkExistence){
      res.status(200).json({success:false,message:'user already exist'});
    }else{
      res.status(200).json({success:true});
    }
    
  } catch (error) {
    return res.status(500).send({success:false,message:'something wrong'});
    
  }
}