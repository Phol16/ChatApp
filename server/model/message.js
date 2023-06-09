import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const MessageSchema = new Schema({
  membersId:{
    type:SchemaTypes.Array
  },
 receiverId:{
  type:SchemaTypes.ObjectId,
  ref:'user'
 },
 senderId:{
  type:SchemaTypes.ObjectId,
  ref:'user'
 },
 text:{
  type:SchemaTypes.String,
 },

},{timestamps: true});

const messageModel = model('Message', MessageSchema);
export default messageModel;
