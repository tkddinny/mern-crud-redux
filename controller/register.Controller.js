import registerModel from "../model/register.Model.js";
import userToken from "../generateToken/userGenerateToken.js";
import bcrypt from "bcrypt";

const createToken = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const register = await registerModel.findOne({ email: email });
    if (register) {
      return res.status(400).json({ message: "user allready axist" });
    } else if (name === "") {
      return res.status(400).json({ message: "Name is required" });
    } else if (email === "") {
      return res.status(404).json({ message: "email is required" });
    } else if (password === "") {
      return res.status(404).json({ message: "password is requered" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          const register = await registerModel.create({
            name,
            email,
            password: hash,
          });
          if (err) {
            return res.status(400).json({ message: "" });
          } else if (register) {
            const token = userToken(register);
            // console.log("token is", token);
            res.status(200).json({ success: true, register, token });
          }
        });
      });
    }
  } catch (error) {
    console.log("create Token is err:", error);
  }
};

const loginToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    const register = await registerModel.findOne({ email: email });
    if (!register) {
      return res.status(404).json({ message: "user not found" });
    } else {
      bcrypt.compare(password, register.password, (err, result) => {
        if (err) {
          return res
            .status(404)
            .json({ messase: "login compare message Err:" });
        } else if (result) {
          const token = userToken(register);
          res.status(200).json({
            success: true,
            message: "user login",
            register,
            token,
          });
        }
      });
    }
  } catch (error) {
    console.log("login token err: ", error.message);
  }
};

const getToken = async (req, res) => {
  try {
    const register = await registerModel.find({});
    if (!register) {
      return res.status(400).json({ message: "user not found" });
    } else {
      res.status(200).json({ success: true, register });
    }
  } catch (error) {
    console.log(error);
  }
};

// const protect = (req,res) =>{
//   try {
//     res.status(200).json({message:"token access"})
//   } catch (error) {
//     console.log(error)
//   }
// }

const protect = (req, res) => {
  try {
    res.status(200).json({ message: "Token access granted" });
  } catch (error) {
    console.error("Protection middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createToken, loginToken, getToken, protect };
