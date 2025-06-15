import JWT from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1.get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2.  get token from Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 3. If no token found
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  // 4. Verify the token
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET); // decoded will contain the user ID and other info from the token

    // 5. Find the user by ID from the decoded token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; //req-user will contain the user data
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
