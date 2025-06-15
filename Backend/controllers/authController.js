import JWT from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    // Save user to the database
    await user.save();
    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    // Respond with user data (excluding password)
    const { password: _, ...userData } = user._doc; // Exclude password from response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    // Respond with user data (excluding password)
    const { password: _, ...userData } = user._doc;
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

// userProfile
export const userProfile = async (req, res) => {
  try {
   
    const user = {
      _id: req.user._id,
      userName: req.user.userName,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
      createdAt: req.user.createdAt
    };
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
