import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from "lucide-react";

export default function TelehealthCall() {
  const [, setLocation] = useLocation();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Remote Video (Simulated) */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
        <div className="flex flex-col items-center opacity-20">
          <Video size={100} />
        </div>
      </div>
      
      {/* Self View (PIP) */}
      <div className="absolute top-16 right-5 w-28 h-40 bg-black/40 rounded-xl overflow-hidden backdrop-blur-md border border-white/10">
         <div className="w-full h-full flex items-center justify-center">
            {camOn ? <div className="w-8 h-8 rounded-full bg-white/20"></div> : <VideoOff size={20} className="text-white/50" />}
         </div>
      </div>

      {/* Main Content Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mb-6">
           <span className="text-4xl">👨‍⚕️</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">Dr. Müller</h2>
        <p className="font-mono text-white/70 bg-black/20 px-3 py-1 rounded-full text-sm">{formatTime(duration)}</p>
      </div>

      {/* Control Bar */}
      <div className="mt-auto p-8 pb-safe bg-gradient-to-t from-black/80 to-transparent z-20">
         <div className="flex items-center justify-center gap-6">
           <button 
             onClick={() => setMicOn(!micOn)}
             className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/20 hover:bg-white/30 text-white" : "bg-white text-slate-900"}`}
           >
             {micOn ? <Mic size={24} /> : <MicOff size={24} />}
           </button>

           <button 
             onClick={() => setLocation("/telehealth/summary")}
             className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transform hover:scale-105 transition-all"
           >
             <PhoneOff size={32} />
           </button>

           <button 
             onClick={() => setCamOn(!camOn)}
             className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${camOn ? "bg-white/20 hover:bg-white/30 text-white" : "bg-white text-slate-900"}`}
           >
             {camOn ? <Video size={24} /> : <VideoOff size={24} />}
           </button>
           
           <button className="absolute right-8 bottom-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
             <MessageSquare size={20} />
           </button>
         </div>
      </div>
    </div>
  );
}
