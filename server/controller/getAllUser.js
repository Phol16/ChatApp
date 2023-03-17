import User from "../model/user.js"

const getAllUser = async(req,res)=>{
  const response = await User.find()

  res.status(200).json({data: response})
}

export default getAllUser