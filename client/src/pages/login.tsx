import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
import { saveAuthState, seedDemoData } from "@/lib/storage";
import { showError } from "@/lib/toast-helpers";
import { useSSOProviders } from "@/hooks/use-sso-providers";

// Feature flags
const SHOW_SSO = false;

// Demo credentials
const DEMO_EMAIL = "alex@example.com";
const DEMO_PASSWORD = "password123";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const { providers } = useSSOProviders();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Validate demo credentials
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        // Save auth state
        saveAuthState({ isLoggedIn: true, userId: "demo-user" });
        // Seed demo data if not exists
        seedDemoData();
        setLoading(false);
        setLocation("/home");
      } else {
        setLoading(false);
        showError("Invalid email or password");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col justify-center" data-testid="login-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-10 text-center">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to manage your health</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
            className="w-full h-12"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          {/* SSO Options */}
          {SHOW_SSO && (
            <>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase tracking-wider">or continue with</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {providers.slice(0, 2).map((provider) => (
                  <Button
                    key={provider.id}
                    type="button"
                    variant="outline"
                    className="h-12 gap-2"
                    onClick={() => setLocation(`/sso/loading?provider=${provider.id}`)}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: provider.backgroundColor,
                        color: provider.textColor
                      }}
                    >
                      <span className="text-[6px] font-bold">{provider.logoInitials}</span>
                    </div>
                    {provider.displayName}
                  </Button>
                ))}
              </div>
            </>
          )}

        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">Register</Link>
        </div>
      </motion.div>
    </div>
  );
}
