import User from "../model/user.js"

const getUser = async(req, res)=>{
  const { username } = req.body
  const find = await User.findOne({username})

  if(!find){
    return res.status(404).json({message: 'no user found'})
  }

  res.status(200).json({
   data : find
  })
}
export default getUser