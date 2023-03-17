import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const MessageSchema = new Schema({
 conversationId:{
  type:SchemaTypes.String,
 },
 sender:{
  type:SchemaTypes.String,
 },
 conversationId:{
  type:SchemaTypes.String,
 },

},{timestamps: true});

const messageModel = model('Message', MessageSchema);
export default messageModel;
