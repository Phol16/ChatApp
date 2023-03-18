import { Router } from 'express';
import Message from '../model/message.js';

const router = Router();

router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json({ message: 'message sent', data: savedMessage });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/', async(req,res)=>{
  try {
    const messages = await Message.find({
      $and:[{membersId:{$in:req.query.receiverId}}, {membersId:{$in:req.query.senderId}}]
    })
    res.status(200).json({data:messages})
  } catch (error) {
    res.status(500).json({message:error})
  }
})

export default router;
