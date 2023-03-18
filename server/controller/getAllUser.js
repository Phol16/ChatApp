import User from "../model/user.js"
import mongoose from "mongoose"


const getAllUser = async(req,res)=>{

  try {
    const response = await User.find()
  
    res.status(200).json({data: response})
    
  } catch (error) {
    res.status(500).json({message:error})
  }
}

export default getAllUser