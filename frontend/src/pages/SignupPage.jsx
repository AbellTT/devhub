import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import api from "../services/api"
import { setCredentials } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [formData, setFormData] = useState({ 
    username: "",
    email: "", 
    password: "" 
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/accounts/register/", formData);
      const response2 = await api.post("/accounts/login/", {
        username: formData.username,
        password: formData.password
      });
      const access = response2.data.access;
      const refresh = response2.data.refresh;
      dispatch(setCredentials({ accessToken: access, refreshToken: refresh, user: null }));
      navigate("/feed");
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to the server. Please try again later.');
      } else {
        // Assuming Django Rest Framework error format
        const backendError = err.response?.data; 
        setError(backendError?.username?.[0] || backendError?.email?.[0] || backendError?.password?.[0] || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your account." 
      subtitle="Join the exclusive community of elite developers today."
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
              placeholder="codingwizard99"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-text/80 italic ml-1">Email <span className="text-primary">*</span></label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40 group-focus-within:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <input 
              id="email"
              name="email"
              autoComplete="email"
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-text/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
              placeholder="developer@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
           <label className="text-sm font-bold text-text/80 italic ml-1">Password <span className="text-primary">*</span></label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40 group-focus-within:text-primary transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <input 
              id="password"
              name="password"
              autoComplete="new-password"
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-text/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <p className="text-xs text-text/40 font-medium ml-1">Must be at least 8 characters long.</p>
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <Button 
            type="button" 
            variant="glass" 
            size="lg" 
            className="w-full"
            icon={<Github className="w-5 h-5" />}
          >
            Sign up with GitHub
          </Button>
        </div>
      </form>

      {/* Footer Link */}
      <p className="mt-10 text-center text-text/60 font-medium">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-bold italic hover:text-accent transition-colors">
          Log in here
        </Link>
      </p>
    </AuthLayout>
  );
}
