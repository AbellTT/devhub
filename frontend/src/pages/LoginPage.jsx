import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, ArrowRight, Github } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import api from '../services/api'
import { setCredentials } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/accounts/login/', formData);
      const access = response.data.access;
      const refresh = response.data.refresh;
      const decodeUser = jwtDecode(access)
      //console.log("user info :", decodeUser) // Changed + to ,
      dispatch(setCredentials({ accessToken: access, refreshToken: refresh, user: decodeUser })); // Passed decodeUser into Redux!
      navigate("/feed");
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to the server. Please try again later.');
      } else {
        const backendError = err.response?.data;
        setError(backendError?.detail || 'Invalid username or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back." 
      subtitle="Log in to access your dashboard, projects, and community."
    >
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm font-medium animate-pulse mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Username Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-text/80 italic ml-1">Username <span className="text-primary">*</span></label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40 group-focus-within:text-primary transition-colors">
              <User className="w-5 h-5" />
            </div>
            <input 
              id="username"
              name="username"
              autoComplete="username"
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-text/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
              placeholder="your_username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-end ml-1">
             <label className="text-sm font-bold text-text/80 italic">Password <span className="text-primary">*</span></label>
             <a href="#" className="text-xs font-bold text-primary hover:text-accent transition-colors italic">Forgot Password?</a>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40 group-focus-within:text-primary transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <input 
              id="password"
              name="password"
              autoComplete="current-password"
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-text/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-4 flex flex-col gap-4">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
            icon={!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            iconPosition="right"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>

          <Button 
            type="button" 
            variant="glass" 
            size="lg" 
            className="w-full"
            icon={<Github className="w-5 h-5" />}
          >
            Continue with GitHub
          </Button>
        </div>
      </form>

      {/* Footer Link */}
      <p className="mt-10 text-center text-text/60 font-medium">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary font-bold italic hover:text-accent transition-colors">
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
}
