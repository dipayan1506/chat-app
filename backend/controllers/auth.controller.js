import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, password, username, confirmpassword, gender } = req.body;

    if (password != confirmpassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    

    //hashed password

const salt =await bcrypt.genSalt(10);
const hashPassword= await bcrypt.hash(password,salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const gitlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : gitlProfilePic,
    });

   if(newUser){
    //Generate JWT token here
    
    await newUser.save();

    res.status(201).json({
      _id: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
   }
   else{
    res.status(400).json({error:"invalid user data"});
   }
  } catch (error) {
    console.log("Error  in SignUp", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const login = (req, res) => {
  console.log("loginUser");
};

export const logout = (req, res) => {
  console.log("logoutUser");
};
