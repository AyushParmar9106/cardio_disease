"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"

export function ProjectIntro() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-1000">
            <div className="relative w-full max-w-2xl h-48 bg-black/95 rounded-xl border border-green-500/20 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>

                {/* Container for the moving line - We animate the wrapper for smooth scrolling */}
                <div className="absolute inset-0 flex items-center overflow-hidden">
                    <svg viewBox="0 0 1000 200" className="h-full w-[200%] stroke-[#00ff41] fill-none stroke-2 animate-ecg-scroll" preserveAspectRatio="none">
                        <path vectorEffect="non-scaling-stroke" d="M0,100 L50,100 L60,100 L70,80 L80,120 L90,100 L130,100 L140,100 L150,50 L160,150 L170,100 L200,100 L250,100 L260,100 L270,80 L280,120 L290,100 L330,100 L340,100 L350,50 L360,150 L370,100 L400,100 L450,100 L460,100 L470,80 L480,120 L490,100 L530,100 L540,100 L550,50 L560,150 L570,100 L600,100 L650,100 L700,100 L750,100 L760,100 L770,80 L780,120 L790,100 L830,100 L840,100 L850,50 L860,150 L870,100 L900,100 L950,100 L960,100 L970,80 L980,120 L990,100" />
                    </svg>
                </div>

                {/* Fade Vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none"></div>

                <style jsx>{`
                .animate-ecg-scroll {
                    animation: scroll 4s linear infinite;
                }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `}</style>

                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_8px_#00ff41]"></div>
                    <span className="text-[#00ff41] text-xs font-mono tracking-widest text-shadow">LIVE MONITORING</span>
                </div>
            </div>

            <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">
                    Cardiovascular Disease Prediction System
                </h1>
                <p className="text-xl text-muted-foreground">
                    An advanced diagnostic tool leveraging Random Forest algorithms to assess heart health in real-time.
                </p>
                <p className="text-sm text-gray-500">

                </p>
            </div>
        </div>
    )
}
