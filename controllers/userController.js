const USER = require("../modals/userModel");

exports.fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await USER.findById(id)?.select("-password");
    if (user) {
      res.status(200).send({ sucess: true, response: user });
    } else {
      res.status(400).send({ sucess: false, msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ sucess: false, msg: "Something went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const rest = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ success: false, msg: "Id is required" });
    }
    const updatedUser = await USER.findByIdAndUpdate(id, rest);
    console.log({ updatedUser });
    if (updatedUser) {
      res.status(200).send({
        sucess: true,
        response: "User updated successfully",
      });
    } else {
      res.status(400).send({ sucess: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, msg: "Something went wrong" });
  }
};
exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await USER.create({ ...data });
    console.log(newUser);
    if (newUser)
      res.status(200).send({
        success: true,
        respone: "User regestered sucessfully",
        id: newUser._id,
      });
    else {
      res.status(400).send({ success: false, message: "Something went wrong" });
    }
  } catch (err) {
    const response = handleErrors(err);
    res.status(500).send({ success: false, message: response.msg });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedUser = await USER.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).send({ sucess: true, msg: "User deleted successfully" });
    } else {
      res.status(400).send({ sucess: false, msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ sucess: false, msg: "Something went wrong" });
  }
};

function handleErrors(err) {
  try {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
      return { msg: "Email address already exists" };
    }
  } catch (error) {
    return { msg: "Something went wrong" };
  }
}
