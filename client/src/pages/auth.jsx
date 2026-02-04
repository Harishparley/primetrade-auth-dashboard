import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Lock, Mail, User, ArrowRight, Sun, Moon } from "lucide-react";

const Auth = ({ mode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🌓 Dark Mode State
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

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
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 px-4 ${isDark ? 'bg-[#0F172A]' : 'bg-gradient-to-br from-indigo-50 via-white to-violet-50'}`}>
      
      {/* 🌓 Floating Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 p-3 rounded-2xl border transition-all active:scale-95 z-50 ${isDark ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-white border-slate-200 text-slate-600 shadow-lg'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className={`max-w-md w-full p-10 rounded-3xl shadow-2xl transition-all duration-300 border relative overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800 shadow-black/20' : 'bg-white border-white shadow-indigo-100/50'}`}>
        
        {/* Decorative background element */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-600/5'}`}></div>

        <div className="relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20 mb-4 transform transition-transform hover:scale-110">
              <Lock size={30} />
            </div>
            <h2 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {mode === "login" ? "Welcome Back" : "Join Primetrade"}
            </h2>
            <p className={`mt-2 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {mode === "login" ? "Securely access your workspace" : "Start managing your notes professionally"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border-l-4 border-rose-500 rounded-r-xl">
              <p className="text-rose-500 text-sm font-bold flex items-center gap-2">
                ⚠️ {error}
              </p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {mode === "signup" && (
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all outline-none font-medium ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-slate-900' : 'bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500'}`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all outline-none font-medium ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-slate-900' : 'bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500'}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all outline-none font-medium ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-slate-900' : 'bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500'}`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] group mt-2"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => navigate(mode === "login" ? "/signup" : "/login")}
                className="text-indigo-500 font-bold hover:text-indigo-400 transition-colors decoration-2 underline-offset-4 hover:underline"
              >
                {mode === "login" ? "Don't have an account? Sign Up" : "Already registered? Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;