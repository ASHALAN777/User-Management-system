const UserModel = require("../Models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signupcontrol = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User exist", succes: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();
    res.status(201).json({
      message: "signup successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "signup failed",
      success: true,
    });
  }
};

const Logincontrol = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Email or Password error", succes: false });
    }
    const ispassequal = await bcrypt.compare(password, user.password);
    if (!ispassequal) {
      return res.status(403).json({ message: "Password error", succes: false });
    }

    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id ,role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );


    
    res.cookie("access_token", jwttoken, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge:7 * 24 *60* 60 * 1000,
    });



    res.status(200).json({
      message: "login successful",
      success: true,
      role: user.role,
      email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({
      message: "login failed",
      success: true,
    });
  }
  
};

module.exports = { Logincontrol, Signupcontrol };
