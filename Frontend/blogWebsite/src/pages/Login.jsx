import { useForm } from "react-hook-form";
import { login } from "../Api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
      console.log("Sending:", data); 

    try {
      setIsLoading(true);
      setServerError("");
      const response = await login(data);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFF7ED" }} className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold " style={{color:"#1F2937"}}>Welcome Back</h1>
            <p className=" mt-2" style={{color:"#1F2937"}}>Sign in to your account</p>
          </div>

          {serverError && (
            <div className="mb-6 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600 text-sm text-center">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                style={{color:"#1F2937"}}
                className="block text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"} focus:outline-none focus:ring-2`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
              style={{color:"#1F2937"}}
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"} focus:outline-none focus:ring-2`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              style={{ backgroundColor: "#F59E0B" }}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${!isValid || isLoading ? " cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm " style={{color:"#1F2937"}}>
              Don't have an account?{" "}
              <a
                href="/register"
                style={{color:"#38BDF8"}}
                className="font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
