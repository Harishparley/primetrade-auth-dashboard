import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api"; // YE LINE ZARURI HAI

const Auth = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Frontend: Data being sent:", formData);
    setError("");

    try {
      // Basic Validation
      if (!formData.email.includes("@")) return setError("Invalid email format");
      if (formData.password.length < 6) return setError("Password must be 6+ chars");

      if (mode === "signup") {
        // 1. Pehle Signup API call karein
        const signupRes = await api.post("/auth/signup", formData);
        console.log("Frontend: Signup Success:", signupRes.data);
        
        // 2. Signup ke baad automatic login
        await login(formData.email, formData.password);
      } else {
        // Regular Login flow
        await login(formData.email, formData.password);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Frontend Auth Error:", err);
      // Backend se aane wala asli error message dikhayein
      setError(err.response?.data?.message || "Authentication failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {mode === "login" ? "Sign in to your account" : "Create new account"}
        </h2>
        
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-200">
            {error}
          </p>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {mode === "login" ? "Sign In" : "Sign Up"}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button" // Type button dena zaruri hai taaki form submit na ho jaye
              onClick={() => {
                setError("");
                navigate(mode === "login" ? "/signup" : "/login");
              }}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;