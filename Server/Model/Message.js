// import mongoose, { mongo } from "mongoose";

// const messageSchema = new mongoose.Schema({
//     message: {
//         text: {
//             type:String,
//             required:true,
//         },
//         users:{
//             type:Array
//         },
//         sender:{
//             type:mongoose.Types.ObjectId,
//             ref:"User",
//             required: true
//         },
//     },
    
// },
// {
//     timestamps:true
// });

// export const Message = mongoose.model('Message',messageSchema);


import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model('message', messageSchema);
