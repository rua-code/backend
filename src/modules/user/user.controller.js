import userRoleModel from "../../../DB/model/request.role.js";
import userModel from "../../../DB/model/user.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.json({ message: "success", user });
  } catch (error) {
    return res.json({ message: `${error} erorr in function` })
  }
};

//فنكشن يعدل على المعلومات 

export const updateUser = async (req, res) => {
  try {
    const { reqId } = req.params;
    const { role, status } = req.body;

    const userRole = await userRoleModel.findOne({ userId: reqId });
    if (!userRole) return res.status(404).json({ message: "User role not found" });

    if (status && role) {
      if (status === "approved") {
        const updatedUser = await userModel.findByIdAndUpdate(reqId, { role }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
      }

      await userRoleModel.findOneAndDelete({ userId: reqId });
      return res.status(200).json({ message: "success" });
    }

    return res.status(400).json({ message: "Missing role or status" });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    // const token=req.id;
    const { userId } = req.params;

    const user = await userModel.findById(userId).select("-password -confirmEmail -sendcode"); // -password يعني لا ترجع الباسورد

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addRenter = async (req, res) => {
  try {
    const id = req.id;
    const user = await userRoleModel.findOne({ userId: id });
    if (!user) {
      const User = await userRoleModel.create({ userId: id, role: "tenant" });
      return res.status(200).json({ message: "success" });
    }
    return res.status(400).json({ message: "you have already requested" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


export const getUserRequest = async (req, res) => {
  try {
    const user = await userRoleModel.find({ status: "pending" }).populate("userId");
    return res.json({ message: "success", user });
  } catch (error) {
    return res.json({ message: `${error} erorr in function` })
  }
};