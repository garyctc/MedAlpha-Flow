import { useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function PkvRedirect() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const insurerName = searchParams.get("insurer") || "Insurance Provider";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/prescriptions/list");
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-500">{insurerName.substring(0, 2).toUpperCase()}</span>
      </div>
      
      <h2 className="text-xl font-bold text-slate-900 mb-2">Opening {insurerName} app...</h2>
      <p className="text-slate-500 mb-8">You'll return here after signing in</p>
      
      <Loader2 className="animate-spin text-primary mb-8" size={32} />
      
      <button 
        onClick={() => setLocation("/prescriptions/pkv-insurer-select")}
        className="text-slate-400 font-medium text-sm hover:text-slate-600"
      >
        Cancel
      </button>
    </div>
  );
}
