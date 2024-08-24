import express from 'express'
import { createToken, getToken, loginToken, protect } from '../controller/register.Controller.js';
import { userVerify , adminProtect }from '../verifyToken/userTokenVerify.js';

const registerRouter = express.Router()

registerRouter.post('/create' , createToken)
registerRouter.post('/login', loginToken)
registerRouter.get('/get', getToken)
registerRouter.get('/admin', userVerify , adminProtect , protect)
// router.get('/admin', userVerify, adminProtect, protect);

export default registerRouter;