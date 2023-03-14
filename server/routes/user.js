import { Router } from "express";
import createUser from "../controller/createUser.js";

const router = Router()

router.route('/')
.get()
.post(createUser)

export default router