import { hashPassword, comaparePassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All filed are required",
      });
    }

    //  checking existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "User already exists",
      });
    }

    // register user password encryting and decryption
    const hashPasswords = await hashPassword(password);

    const user = await new userModel({
      username,
      email,
      password: hashPasswords,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error in registration process",
    });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(403).send({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      res.status(404).send({
        success: false,
        massage: "UserName not found please register",
      });
    }

    const match = await comaparePassword(password, user.password);

    if (!match) {
      res.status(200).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    res.status(201).send({
      success: true,
      message: "User Login Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in Login to user",
    });
  }
};
