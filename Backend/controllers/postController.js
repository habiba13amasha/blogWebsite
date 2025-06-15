import dotenv from "dotenv";
dotenv.config();
import Post from "../models/Post.js";
import axios from "axios";

// Create Post
export const createPost = async (req, res) => {
  const { title, content, category, image } = req.body;
  const author = req.user._id;

  if (!title || !content || !category || !author) {
    return res.status(400).json({ message: "Title, content, category and author are required" });
  }

  try {
    
    const newPost = new Post({
      title,
      content,
      category,
      image: image || "", 
      author,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, image } = req.body;

  try {
    

    let imageUrl = image;

    if (image && image.startsWith("data:image")) {
      const formData = new FormData();
      const blob = Buffer.from(image.split(",")[1], "base64");

      formData.append("image", blob.toString("base64"));

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: process.env.IMGBB_API_KEY,
          },
        }
      );

      imageUrl = response.data.data.url;
    }

    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, category, image: imageUrl },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post updated successfully", post });

  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {

    const post = await Post.findByIdAndDelete(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .populate("author", "userName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments()
    ]);

    res.status(200).json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Post By ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author", "userName email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Posts By Category
export const getPostsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find({ category })
        .populate("author", "userName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments({ category }),
    ]);
    
    res.status(200).json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching category posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get latest posts
export const getLatestPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "userName")
      .sort({ createdAt: -1 })
      .limit(4);
      
    res.status(200).json({ 
      success: true,
      posts 
    });
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};
