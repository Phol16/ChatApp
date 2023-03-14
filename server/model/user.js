import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const userSchema = new Schema({
  username: {
    type: SchemaTypes.String,
    required: [true, 'Username is required'],
    unique: true,
  },
  fullName: {
    type: SchemaTypes.String,
    default: 'User',
  },
  image:{
    type: SchemaTypes.String,
    default: 'No Photo'
  }
},{timestamps: true});

const userModel = model('user', userSchema);
export default userModel;
