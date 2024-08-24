import express from "express";
import {
  createUser,
  deleteUser,
  getUserAll,
  getUserSingle,
  updateUser,
} from "../controller/user.Controller.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/get", getUserAll);
userRouter.get("/get/:id", getUserSingle);
userRouter.put("/update/:id", updateUser);
// Ensure the route has :id in the path
// userRouter.put('/update/:id', updateUser);

userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
