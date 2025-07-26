import React, { useState } from "react";
import {
  User,
  Lock,
  UserPlus,
  LogIn,
  Heart,
  FileText,
  Search,
  Brain,
  Upload,
  Link,
} from "lucide-react";

const AuthSystem = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const BASEURL = import.meta.env.VITE_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setErrors({ email: "Enter a valid email address" });
      setLoading(false);
      return;
    }

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrors({ general: "email and password are required" });
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      setLoading(false);
      return;
    }

    try {
      // Replace this with your actual API calls
      const endpoint = isLogin ? "/login" : "/register";
      const response = await fetch(
        // `https://web-production-2282d.up.railway.app${endpoint}`,
        `${BASEURL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Successful authentication

        const userData = {
          id: data.user_id,
          email: formData.email,
        };
        // Call the onLogin prop to update parent state and redirect
        onLogin(userData, data.token);

        // Clear form
        setFormData({ email: "", password: "", confirmPassword: "" });
      } else {
        // Handle API errors
        setErrors({ general: data.message || "Authentication failed" });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({ general: "Network error. Please try again." });
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (errors.general || errors.password) {
      setErrors({});
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 lg:gap-20">
        {/* Left Side - Authentication Form */}
        <div className="flex items-center justify-left">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/40 shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? "Sign in to manage your documents"
                  : "Join our document management community"}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-gray-800"
                    placeholder="Enter your email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white/50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-gray-800"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-white/50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-gray-800"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              {errors.email && (
                <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {errors.email}
                </div>
              )}

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {errors.general}
                </div>
              )}

              {errors.password && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {errors.password}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn className="w-5 h-5" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                onClick={toggleMode}
                className="text-blue-500 hover:text-blue-600 font-medium mt-1 transition-colors text-sm"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Information Panel */}
        <div className="flex items-center justify-center">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full border border-white/40 shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Smart Document Hub
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Transform your learning and research workflow by effortlessly
                uploading PDF files or sharing web links. Our AI-powered
                platform automatically extracts and summarizes content, creating
                personalized study tools while making everything instantly
                searchable through our unified, intelligent search powered by
                advanced algorithms.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Effortless Upload
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Simply drag and drop PDF files or paste web links to
                    instantly add your learning materials to your personal
                    library.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Advanced AI automatically generates summaries, extracts key
                    concepts, and creates custom study tools tailored to your
                    content.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Intelligent Search
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Find any information across all your documents instantly
                    with semantic search that understands context and meaning.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-lg p-3">
                  <Link className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Web Integration
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Connect your research by sharing web articles, papers, and
                    online resources alongside your PDF documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  🚀 Powered by advanced AI and Algolia MCP Server
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;
