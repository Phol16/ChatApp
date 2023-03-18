import { Router } from "express";
import createUser from "../controller/createUser.js";
import getAllUser from "../controller/getAllUser.js";
import getProfile from "../controller/getProfile.js";
import getUser from "../controller/getUser.js";

const router = Router()

router.route('/')
.get(getAllUser)
.post(createUser)

router.route('/logIn')
.post(getUser)

router.route('/profile')
.get(getProfile)

export default router