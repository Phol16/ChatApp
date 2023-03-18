import User from "../model/user.js"

const getProfile=async(req, res)=>{
  const { id } = req.query

  try {
    const response = await User.findOne({_id: id})
  
    res.status(200).json({data:response})
  } catch (error) {
    res.status(500).json({message: error})
  }
}

export default getProfile