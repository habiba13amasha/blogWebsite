import Post from "../models/Post.js";

export const checkOwnerMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check if the user is the owner of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  } catch (error) {
    console.error("Error checking post ownership:", error);
    res.status(500).json({ message: "Server error" });
  }
};
