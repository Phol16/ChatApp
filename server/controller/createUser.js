import app from "../app.js";
import User from "../model/user.js";
import { CloudinaryService } from "../utils/cloudinaryService.js";

const createUser = async(req, res)=>{
  const {username, fullName, image} = req.body
  try {
    const cloudinary = app.get(CloudinaryService.cloudinaryName)
    
    const cloudImage = await  cloudinary.uploader.upload(image,{
      upload_preset: 'ChatApp',
    })
    const newUser = new User ({
      username,
      fullName,
      image: cloudImage.url,
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