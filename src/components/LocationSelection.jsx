import React, { useState } from 'react';

function LocationSelection({ location, setLocation, onNext }) {
    const [showTip, setShowTip] = useState(false);
    const [activeTip, setActiveTip] = useState({ title: '', text: '' });

    const locations = [
        { id: 'Classroom', icon: 'school', title: 'Classroom', tip: 'Focus on your breathing to ground yourself amidst the academic noise.' },
        { id: 'Office', icon: 'desk', title: 'Office', tip: 'Adjust your chair to support your back and soften your gaze away from the screen for at least 20 seconds.' },
        { id: 'Home', icon: 'cottage', title: 'Home', tip: 'Find a quiet corner away from daily chores to establish your personal sanctuary.' },
        { id: 'Commute', icon: 'directions_subway', title: 'Commute', tip: 'Close your eyes gently if it\'s safe, letting the rhythmic motion of travel become a metronome for relaxation.' },
        { id: 'Public Space', icon: 'park', title: 'Public Space', tip: 'Tune in to the ambient sounds without judging them, observing the world as a detached observer.' }
    ];

    const handleSelectLocation = (loc) => {
        setLocation(loc.id);
        setActiveTip({ title: `Tip for the ${loc.title}`, text: loc.tip });
        setShowTip(true);
    };

    return (
        <div className="layout-container flex h-full grow flex-col w-full">
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
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-2 lg:px-8 w-full max-w-[1200px] mx-auto z-10 min-h-0 overflow-hidden">
                <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-6">
                    <div className="text-center space-y-1 sm:space-y-2">
                        <p className="text-primary font-medium tracking-wide text-xs sm:text-sm uppercase">Step 2: Context</p>
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Where are you right now?</h1>
                        <p className="text-slate-500 dark:text-[#9db9a6] text-sm md:text-lg max-w-xl mx-auto pt-1 sm:pt-2">Select your current environment to receive a tailored relaxation tip.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {locations.map((loc) => {
                            const isSelected = location === loc.id;
                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => handleSelectLocation(loc)}
                                    className={`group relative flex flex-col items-center justify-center gap-2 md:gap-4 p-4 md:p-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark h-32 md:h-40 lg:h-44 bg-white dark:bg-surface-dark overflow-hidden ${isSelected
                                        ? 'border-2 border-primary shadow-[0_0_15px_rgba(19,236,91,0.2)]'
                                        : 'border border-slate-200 dark:border-[#28392e] hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(19,236,91,0.1)]'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 pointer-events-none z-0"></div>
                                    )}
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 text-primary">
                                            <span className="material-symbols-outlined text-xl">check_circle</span>
                                        </div>
                                    )}
                                    <span className={`relative z-10 material-symbols-outlined text-4xl transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
                                        {loc.icon}
                                    </span>
                                    <span className={`relative z-10 font-semibold transition-colors duration-300 ${isSelected ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-200 group-hover:text-primary'}`}>
                                        {loc.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col w-full items-center mt-2 h-[180px] sm:h-[160px] pb-2">
                        {/* Tip Box Container - fixed height to prevent layout shift */}
                        <div className="w-full flex justify-center min-h-[90px] sm:min-h-[80px]">
                            <div className={`transition-all duration-300 w-full max-w-2xl bg-white dark:bg-surface-dark border border-primary p-4 sm:p-5 sm:py-4 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center gap-3 sm:gap-4 ${showTip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl flex-shrink-0">lightbulb</span>
                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-slate-500 dark:text-[#9db9a6] uppercase tracking-wider mb-0.5">{activeTip.title || 'Tip'}</h3>
                                    <p className="text-xs sm:text-sm text-slate-800 dark:text-white leading-relaxed line-clamp-2 md:line-clamp-3">{activeTip.text || ' '}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`w-full flex justify-center mt-auto pt-2 transition-all duration-300 ${location ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                            <button
                                onClick={onNext}
                                disabled={!location}
                                className="group flex items-center justify-center gap-2 bg-neon-green hover:bg-neon-green/90 text-background-dark font-bold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(0,255,102,0.2)]"
                            >
                                <span>Next Step</span>
                                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Background decorations for this screen are handled in App.jsx globally or can be placed here */}
        </div>
    );
}

export default LocationSelection;
