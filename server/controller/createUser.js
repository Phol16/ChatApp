import User from "../model/user.js";

const createUser = async(req, res)=>{
  const { username } = req.body

  try {
    const newUser = new User ({
      username,
      fullName,
      image,
    })
    
    const saved = await newUser.save()

    res.status(200).json({
      message: 'User Added',
      data: saved
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export default createUser