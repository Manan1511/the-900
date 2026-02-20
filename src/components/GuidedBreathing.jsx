import React, { useState, useEffect } from 'react';

function GuidedBreathing({ onComplete }) {
    const TOTAL_SECONDS = 300; // 5 minutes

    const [isPaused, setIsPaused] = useState(false);

    const [displayState, setDisplayState] = useState({
        timeRemaining: TOTAL_SECONDS,
        breathState: 'Exhale',
        breathTimer: 4
    });

    const startTimeRef = React.useRef(null);
    const totalPausedTimeRef = React.useRef(0);
    const pausedAtRef = React.useRef(null);
    const petalsRef = React.useRef([]);
    const containerRef = React.useRef(null);

    const togglePause = () => {
        if (isPaused) {
            const pausedDuration = Date.now() - pausedAtRef.current;
            totalPausedTimeRef.current += pausedDuration;
            pausedAtRef.current = null;
            setIsPaused(false);
        } else {
            pausedAtRef.current = Date.now();
            setIsPaused(true);
        }
    };

    useEffect(() => {
        let rafId;
        let lastSeconds = -1;

        const loop = () => {
            if (isPaused) {
                rafId = requestAnimationFrame(loop);
                return;
            }

            const now = Date.now();
            if (!startTimeRef.current) {
                startTimeRef.current = now;
            }
            const elapsedMs = now - startTimeRef.current - totalPausedTimeRef.current;

            // 8-second cycle: 0-4000ms Inhale (Expand), 4000-8000ms Exhale (Contract)
            const cycleMs = elapsedMs % 8000;
            const isInhale = cycleMs < 4000;

            // Progress goes from 0 to 1 during inhale, and 1 to 0 during exhale
            let progress;
            if (isInhale) {
                progress = cycleMs / 4000;
            } else {
                progress = 1 - ((cycleMs - 4000) / 4000);
            }

            // Smoothen the progress with ease-in-out
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            if (petalsRef.current.length === 6) {
                const rotation = easeProgress * 45; // Subtle overall rotation
                const expansion = easeProgress * 65; // Much wider expansion for flower shape

                petalsRef.current.forEach((petal, i) => {
                    if (petal) {
                        const petalAngle = i * 60;
                        const scale = 0.85 + (easeProgress * 0.4); // Bloom from 0.85 to 1.25
                        const opacity = 0.4 + (easeProgress * 0.5); // Min opacity 0.4

                        // We rotate the petal to its spot, translate it out, then counter-rotate slightly for interest
                        petal.style.transform = `rotate(${petalAngle + rotation}deg) translate(${expansion}px) scale(${scale})`;
                        petal.style.opacity = opacity;
                    }
                });
            }

            if (containerRef.current) {
                const containerScale = 1 + (easeProgress * 0.1);
                containerRef.current.style.transform = `scale(${containerScale})`;
            }

            const elapsedWholeSec = Math.floor(elapsedMs / 1000);
            const currentSeconds = Math.max(0, TOTAL_SECONDS - elapsedWholeSec);

            if (currentSeconds !== lastSeconds) {
                lastSeconds = currentSeconds;

                const currentBreathTimer = 4 - (elapsedWholeSec % 4);

                setDisplayState({
                    timeRemaining: currentSeconds,
                    breathState: isInhale ? 'Inhale' : 'Exhale',
                    breathTimer: currentBreathTimer
                });

                if (currentSeconds <= 0) {
                    onComplete();
                    return;
                } // Stop RAF by not requesting next frame
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(rafId);
            // Help linter realize petalsRef is used if needed, though mostly for cleanup consistency
            petalsRef.current = [];
        };
    }, [isPaused, onComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center relative w-full px-4 h-full min-h-0">
            <header className="flex items-center justify-between px-4 md:px-8 py-4 w-full max-w-7xl mx-auto flex-shrink-0 relative z-20">
                <div className="flex items-center gap-3 group cursor-pointer text-slate-900 dark:text-white">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                        <span className="material-symbols-outlined text-xl">spa</span>
                    </div>
                    <h1 className="font-bold text-lg tracking-tight">The 900</h1>
                </div>
                <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Step 3 of 3</span>
                    <div className="flex gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
                    </div>
                </div>
                <div className="flex items-center justify-end w-32">
                    <button
                        onClick={onComplete}
                        className="group hidden md:flex h-9 px-4 items-center justify-center rounded-lg bg-slate-200 dark:bg-surface-dark text-sm font-bold hover:bg-slate-300 dark:hover:bg-[#25382b] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-slate-900 dark:text-white"
                    >
                        Exit
                    </button>
                </div>
            </header>

            {/* Background orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Removed the misaligned mid-screen progress bar */}

            <div className="relative flex flex-col flex-1 items-center justify-center z-10 w-full max-w-3xl mb-20 min-h-0">
                <div className="mb-4 flex flex-col items-center flex-shrink-0 relative z-20">
                    <div className="text-4xl md:text-5xl font-light tracking-tighter tabular-nums text-slate-900 dark:text-white drop-shadow-md">
                        {formatTime(displayState.timeRemaining)}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
                        Remaining
                    </div>
                </div>

                <div className="relative flex items-center justify-center w-[250px] h-[250px] md:w-[320px] md:h-[320px] flex-shrink-0 my-8 z-0">
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationPlayState: isPaused ? 'paused' : 'running' }}></div>

                    {/* Flower Container */}
                    <div
                        ref={containerRef}
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ opacity: isPaused ? 0.6 : 1, transition: 'opacity 0.5s ease' }}
                    >
                        {/* Center Core Glow - to anchor the flower */}
                        <div className="absolute w-[30%] h-[30%] bg-primary/40 rounded-full blur-[40px] z-0 pointer-events-none" />

                        {/* Petals Container for Mix-Blend-Mode context */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    ref={el => petalsRef.current[i] = el}
                                    className="flower-petal w-[48%] h-[48%]"
                                    style={{ transformOrigin: 'center' }}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-center text-center p-6 z-10 relative">
                            <span className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-lg" style={{ transform: 'scale(1)', zIndex: 30 }}>
                                {isPaused ? 'Paused' : displayState.breathState}
                            </span>
                            {!isPaused && (
                                <span className="text-xs font-medium text-primary mt-2 uppercase tracking-widest opacity-80 block !static" style={{ transform: 'scale(1)' }}>
                                    {displayState.breathTimer} Seconds
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className="absolute bottom-6 w-full flex justify-center z-10 px-4">
                <div className="flex gap-4">
                    <button
                        onClick={onComplete}
                        className="group h-12 px-8 rounded-full border-2 border-surface-dark bg-transparent text-red-500 hover:bg-red-500/10 transition-all duration-300 font-bold text-sm flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
                    >
                        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">close</span>
                        <span>End</span>
                    </button>

                    <button
                        onClick={togglePause}
                        className="group h-12 px-8 rounded-full bg-neon-green hover:bg-neon-green/90 text-background-dark font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-[18px] font-bold group-hover:scale-110 transition-transform">{isPaused ? 'play_arrow' : 'pause'}</span>
                        <span>{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                </div>
            </div>

            <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60 z-0"></div>
        </div>
    );
}

export default GuidedBreathing;
