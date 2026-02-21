import React from 'react';

function SessionSummary({ stressLevel, location, onReturnHome, onAboutUs }) {

    // Calculate a "feeling now" based on a generic success of the session
    // In a real app, you might ask them again.
    const getFeelingText = (startStress) => {
        if (startStress > 70) return "Centered";
        if (startStress > 40) return "Relaxed";
        return "Refreshed";
    };

    const getStartStressText = (startStress) => {
        if (startStress > 75) return { text: "Overwhelmed", icon: "sentiment_very_dissatisfied" };
        if (startStress > 50) return { text: "Anxious", icon: "sentiment_stressed" };
        if (startStress > 25) return { text: "Tense", icon: "sentiment_neutral" };
        return { text: "Calm", icon: "sentiment_satisfied" };
    };

    const startMood = getStartStressText(stressLevel);

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-subtle bg-background-dark px-6 py-4 lg:px-10 z-10">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                    <h2 className="text-lg font-bold leading-tight tracking-tight text-white">The 900</h2>
                </div>
                <div className="flex w-32 justify-end"></div>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center p-4 py-12 sm:px-8 z-10 animate-fade-in-fast">
                <div className="flex w-full max-w-[640px] flex-col gap-8">

                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-surface-dark ring-1 ring-primary/30 shadow-[0_0_30px_-10px_rgba(0,255,102,0.3)]">
                            <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                            <div className="absolute -inset-1 rounded-full border border-primary/20 opacity-50"></div>
                            <div className="absolute -inset-2 rounded-full border border-dashed border-primary/20 opacity-30"></div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">Session Complete</h1>
                            <p className="text-text-muted text-lg">You've successfully reclaimed 900 seconds for yourself at the {location}.</p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border-subtle bg-surface-dark p-6 shadow-xl">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Started As</span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-text-muted" style={{ fontVariationSettings: "'FILL' 0" }}>{startMood.icon}</span>
                                    <span className="text-2xl font-bold text-white">{startMood.text}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center px-4 py-2 sm:py-0">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-lighter text-text-muted border border-border-subtle">
                                    <span className="material-symbols-outlined text-sm rotate-90 sm:rotate-0" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col items-center gap-2 sm:items-end">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">Feeling Now</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{getFeelingText(stressLevel)}</span>
                                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>sentiment_satisfied</span>
                                </div>
                            </div>

                        </div>

                        <div className="my-6 h-px w-full bg-border-subtle"></div>

                        <div className="flex items-center justify-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[#0b1c12]">
                                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>hourglass_top</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold leading-none text-white">15</span>
                                <span className="text-sm font-medium text-text-muted">Minutes Reclaimed</span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full font-bold text-white shadow-[0_0_20px_-5px_rgba(45,212,191,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_-5px_rgba(45,212,191,0.5)] active:scale-[0.99]"
                        style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}
                        onClick={() => window.open('https://telemanas.mohfw.gov.in/home', '_blank')}
                    >
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                        Still feeling stressed? Call experts
                    </button>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-white" htmlFor="reflection">Final Reflection</label>
                        <div className="relative">
                            <textarea
                                className="w-full rounded-lg border-0 bg-surface-lighter ring-1 ring-border-subtle p-4 text-white placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary focus:outline-none resize-none shadow-sm transition-shadow"
                                id="reflection"
                                name="reflection"
                                placeholder="Add a brief note about how this session made you feel..."
                                rows="3"
                            ></textarea>
                            <div className="absolute bottom-3 right-3">
                                <span className="material-symbols-outlined text-text-muted text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>edit_note</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            onClick={onReturnHome}
                            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 text-[#0b1c12] font-extrabold shadow-[0_0_20px_-5px_rgba(0,255,102,0.4)] transition-all hover:bg-primary-hover hover:shadow-[0_0_25px_-5px_rgba(0,255,102,0.6)] active:scale-[0.99]"
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>home</span>
                            Return Home
                        </button>
                        <button
                            onClick={onAboutUs}
                            className="mt-2 text-sm text-text-muted hover:text-white transition-colors group flex items-center justify-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            <span className="group-hover:underline underline-offset-4 decoration-1">Why "The 900"?</span>
                        </button>
                    </div>

                </div>
            </main>

            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"></div>
                <div className="absolute -right-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
            </div>
        </div>
    );
}

export default SessionSummary;
