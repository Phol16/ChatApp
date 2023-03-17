import { Router } from "express";
import Conversation from "../model/conversation.js";

const router = Router()

router.route('/')
.post(async(req,res)=>{
  const newConversation = new Conversation({
    members:[req.body.senderId, req.body.receiverId ]
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json({ data: savedConversation})
  } catch (error) {
    res.status(500).json({message: error})
  }
})


export default router