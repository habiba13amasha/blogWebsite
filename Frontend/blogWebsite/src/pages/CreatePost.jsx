import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createPost, getProfile } from "../Api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setError("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };
 
   useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await getProfile();
      setUser(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  fetchUserData();
}, []);



const onSubmit = async (data) => {
  try {
    setIsLoading(true);
    setError("");

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      // convert base64 to Blob
      const blob = await fetch(image).then(res => res.blob());
      formData.append("image", blob, `post-${Date.now()}.jpg`);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: import.meta.env.VITE_IMGBB_API_KEY,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      imageUrl = response.data.data.url;
    }

    const postData = {
      ...data,
      image: imageUrl,
      author: user._id,
    };

    await createPost(postData);
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to create post");
    console.error("Upload error:", err.response?.data);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className=" min-h-screen pb-16 pt-10 " style={{backgroundColor:"#FDFDFD"}}>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md " >
      <h1 className="text-3xl font-bold mb-8 text-center" style={{color:"#1F2937"}}>
        Create New Post
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium " style={{color:"#1F2937"}}>
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter post title"
          />
          {errors.title && (
            <span className="text-sm text-red-600">{errors.title.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium " style={{color:"#1F2937"}}>
            Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[200px]"
            placeholder="Write your post content here..."
          />
          {errors.content && (
            <span className="text-sm text-red-600">
              {errors.content.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium " style={{color:"#1F2937"}}>
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select a category</option>
            <option value="Programming">Programming</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Beauty">Beauty</option>
            <option value="Fashion">Fashion</option>
            <option value="Travel">Travel</option>
            <option value="Art & Design">Art & Design</option>
          </select>
          {errors.category && (
            <span className="text-sm text-red-600">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium " style={{color:"#1F2937"}}>
            Image <span style={{color:"#1F2937"}}>(max 2MB)</span>
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer transition">
              <div className="flex flex-col items-center justify-center pt-2 pb-3">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-25 w-200 object-contain "
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-1 text-sm" style={{color:"#1F2937"}}>
                      Click to upload an image
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            style={{backgroundColor:"#F59E0B"}}
            className={`cursor-pointer px-6 py-3 rounded-lg text-white font-medium transition ${isLoading ? " cursor-not-allowed" : " shadow-md"}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
