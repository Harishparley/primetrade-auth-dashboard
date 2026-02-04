import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Auth = ({ mode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        await api.post("/auth/signup", formData);
        await login(formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {mode === "login" ? "Sign in" : "Create Account"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {mode === "signup" && (
              <input type="text" placeholder="Full Name" className="appearance-none rounded block w-full px-3 py-2 border" 
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            )}
            <input type="email" placeholder="Email" className="appearance-none rounded block w-full px-3 py-2 border" 
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="appearance-none rounded block w-full px-3 py-2 border" 
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </button>
          <button type="button" onClick={() => navigate(mode === "login" ? "/signup" : "/login")} className="w-full text-indigo-600 mt-4">
            {mode === "login" ? "Need an account? Sign Up" : "Have an account? Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;