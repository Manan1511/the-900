import React, { useState } from 'react';

function LandingPage({ onStart }) {
    const [isStarting, setIsStarting] = useState(false);

    const handleStartClick = () => {
        setIsStarting(true);
        setTimeout(() => {
            onStart();
        }, 1400); // Wait 1.4s before switching the page so the user sees the zoom effect
    };

    return (
        <main className="flex-grow flex items-center justify-center relative w-full h-full min-h-0 overflow-hidden">

            <div className="relative z-10 flex flex-col items-center justify-center gap-10 sm:gap-14 w-full max-w-7xl px-6">
                <div className="flex flex-col items-center gap-4 animate-fade-in relative z-50">
                    <h1 className="text-slate-900 dark:text-white font-extrabold text-center text-massive lowercase drop-shadow-2xl flex items-center justify-center tracking-tight">
                        <span className={`transition-opacity duration-1000 ${isStarting ? 'opacity-0' : 'opacity-100'}`}>the 90</span>
                        <span className={`inline-block origin-[50%_45%] transition-all duration-[1500ms] ease-in will-change-transform ${isStarting ? 'scale-[25] opacity-0 blur-2xl pointer-events-none' : 'scale-100'}`}>0</span>
                    </h1>
                </div>

                <div
                    className={`flex flex-col items-center gap-6 transition-all duration-1000 ease-in-out fill-mode-forwards ${isStarting ? 'opacity-0 translate-y-4 pointer-events-none' : 'animate-fade-in delay-200 opacity-100'}`}
                >
                    <div className="relative flex items-center justify-center">
                        <button
                            onClick={handleStartClick}
                            disabled={isStarting}
                            className={`group relative flex items-center justify-center gap-3 h-20 pl-16 pr-12 bg-neon-green text-background-dark text-xl sm:text-2xl font-bold tracking-wider rounded-full shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-neon-green/50 z-10 ${isStarting ? '' : 'hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(0,255,102,0.6)]'}`}
                        >
                            <span className="relative z-10">START</span>
                            <span className="material-symbols-outlined relative z-10 text-3xl group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        </button>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide opacity-60">
                        15 minutes. 3 steps. Total focus.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default LandingPage;
