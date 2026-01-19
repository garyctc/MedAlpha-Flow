import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import dmLogo from "@/assets/dm-logo.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation("/home");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center" data-testid="login-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-10 text-center">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img src={dmLogo} alt="DM Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to manage your health</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all"
              required 
              defaultValue="alex@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all pr-10"
                required
                defaultValue="password123"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start text-sm">
            <a href="#" className="text-primary font-medium hover:underline">Forgot password?</a>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <a href="#" className="text-primary font-bold hover:underline">Register</a>
        </div>
      </motion.div>
    </div>
  );
}
