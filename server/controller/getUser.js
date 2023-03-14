import User from "../model/user"

const getUser = async(req, res)=>{
  const { username } = req.body
  const find = await User.find({username})

  if(find){
    return res.statu(404).json({message: 'no user found'})
  }

  res.stauts(200).json({
   data : find
  })
}
export default getUser