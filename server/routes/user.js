import { Router } from "express";
import createUser from "../controller/createUser.js";
import getAllUser from "../controller/getAllUser.js";
import getProfile from "../controller/getProfile.js";
import getUser from "../controller/getUser.js";
import searchUser from "../controller/searchUser.js";

const router = Router()

router.route('/')
.get(getAllUser)
.post(createUser)

router.route('/logIn')
.post(getUser)

router.route('/profile')
.get(getProfile)

router.route('/search')
.get(searchUser)

export default router