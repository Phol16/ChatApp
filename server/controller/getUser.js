import User from "../model/user.js"

const getUser = async(req, res)=>{
  const { username } = req.body
  const find = await User.findOne({username})

  if(!find){
    const newUser = new User({
      username,
    })
    const response = await newUser.save()

    return res.status(200).json({data:response})
  }

  res.status(200).json({
   data : find
  })
}
export default getUser