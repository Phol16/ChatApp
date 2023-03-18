import User from '../model/user.js';
import mongoose from 'mongoose';

const getAllUser = async (req, res) => {
  try {
    let response = await User.find();

    response = response.filter((e) => {
      return String(e._id) !== req.query.sender;
    });

    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllUser;
