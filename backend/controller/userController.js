const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    if (req.file) {
      userData.pic = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const user = new User(userData);
    await user.save();

    res.status(200).json({ message: "User Register Successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email})
    if (!user) return res.status(400).json({ message: "User Email not found " });

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).json({message: "Does not match your Password"})
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.status(200).json({token});
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ message: "server error" });
  }
};


// Serve user profile picture by user ID
const getPic =  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.pic || !user.pic.data) {
      return res.status(404).send("No image found");
    }

    res.set("Content-Type", user.pic.contentType);
    res.send(user.pic.data);
  } catch (error) {
    console.error("Image fetch error:", error);
    res.status(500).send("Server error");
  }
};

// GET /auth/user/:id
const getName =  async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email"); // choose what to send
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { login, register, getPic, getName };
