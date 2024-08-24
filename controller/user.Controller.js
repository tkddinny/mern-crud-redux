import userModel from "../model/user.Model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    if (name === "") {
      return res.status(400).json({ message: "Name is required" });
    } else if (email === "") {
      return res.status(400).json({ message: "Email is required" });
    } else if (contact === "") {
      return res.status(400).json({ message: "Contact is required" });
    } else {
      const user = await userModel.create({ name, email, contact });
      if (!user) {
        return res.status(400).json({ message: "user not created" });
      } else {
        res.status(200).json({ success: true, user });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserAll = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    } else {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "single user not found" });
    } else {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const user = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      contact,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ success: true, user });
    }
  } catch (error) {
    console.log(error);
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params; // Make sure the id is correctly retrieved from req.params
//     const { name, email, contact } = req.body;

//     // Validate id
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const user = await userModel.findByIdAndUpdate(id, {
//       name,
//       email,
//       contact,
//     }, { new: true }); // Ensure the updated user is returned

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const deleteUser = async (req,res) =>{
  try {
    const {id} = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ success: true, message:"deleted user" });
    }
  } catch (error) {
    console.log(error);
  }
}

export { createUser, getUserAll, getUserSingle, updateUser , deleteUser };
