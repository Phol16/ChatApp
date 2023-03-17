import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const ConversationSchema = new Schema({
 member:{
  type:SchemaTypes.Array,
 }
},{timestamps: true});

const conversationModel = model('Conversation', ConversationSchema);
export default conversationModel;
