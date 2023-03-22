import User from "../model/user.js"
const searchUser = async( req, res)=>{
 const {username} = req.body
 try {
  const find = await User.findOne({username})
  if(!find){
    return res.status(404).json({message: 'User doesnt exist'})
  }
  res.status(200).json({data: find})
 } catch (error) {
  res.status(500).json({error: error})
 }
}
export default searchUser
