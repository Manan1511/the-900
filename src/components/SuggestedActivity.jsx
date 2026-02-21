import React from 'react';

function SuggestedActivity({ suggestedActivity, onComplete }) {
    return (
        <div className="layout-container flex h-full grow flex-col w-full relative">
            <header className="flex items-center justify-between px-4 md:px-8 py-4 w-full max-w-7xl mx-auto flex-shrink-0 relative z-20">
                <div className="flex items-center gap-3 group cursor-pointer text-slate-900 dark:text-white">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                        <span className="material-symbols-outlined text-xl">spa</span>
                    </div>
                    <h1 className="font-bold text-lg tracking-tight">The 900</h1>
                </div>
                <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Step 2 of 3</span>
                    <div className="flex gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
                        <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                </div>
                <div className="flex items-center justify-end w-24">
                    <button
                        onClick={onComplete}
                        className="group hidden md:flex h-9 px-4 items-center justify-center rounded-lg bg-slate-200 dark:bg-surface-dark text-sm font-bold hover:bg-slate-300 dark:hover:bg-[#25382b] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-slate-900 dark:text-white"
                    >
                        Exit
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 w-full max-w-4xl mx-auto min-h-0 overflow-hidden mt-16">

                {/* Activity Suggestion Box */}
                <div className="w-full max-w-2xl bg-white dark:bg-surface-dark border opacity-90 border-primary p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] mb-10 md:mb-16 relative overflow-hidden group">

                    <div className="flex items-start gap-4">
                        <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 relative">
                            <span className="material-symbols-outlined text-[20px] relative z-10 animate-pulse">psychology_alt</span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xs md:text-sm font-bold text-slate-500 dark:text-[#9db9a6] tracking-widest uppercase mb-2">Your 5-Minute Activity</h2>
                            <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                                {suggestedActivity || "Take a moment to disconnect and find physical comfort in your environment."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4 mt-8 md:mt-12">
                    <button
                        onClick={onComplete}
                        className="group h-12 px-8 rounded-full bg-neon-green hover:bg-neon-green/90 text-background-dark font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <span>Continue to Breathing</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>

            </main>
        </div>
    );
}

export default SuggestedActivity;
