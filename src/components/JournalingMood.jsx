import React, { useState } from 'react';

function JournalingMood({ onContinue, journalEntry, setJournalEntry, stressLevel, setStressLevel, energyLevel, setEnergyLevel }) {
    const editorRef = React.useRef(null);

    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);

    // Calculate word count
    const words = journalEntry.trim().split(/\s+/);
    const wordCount = journalEntry.trim() === '' ? 0 : words.length;

    const handleFormat = (command) => {
        document.execCommand(command, false, null);
        checkFormatState();
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const checkFormatState = () => {
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
    };

    return (
        <div className="relative z-10 flex flex-col h-full w-full">
            <header className="flex items-center justify-between px-4 md:px-8 py-4 w-full max-w-7xl mx-auto flex-shrink-0">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                        <span className="material-symbols-outlined text-xl">spa</span>
                    </div>
                    <h1 className="font-bold text-lg tracking-tight">The 900</h1>
                </div>

                <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Step 1 of 3</span>
                    <div className="flex gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
                        <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative w-full max-w-5xl mx-auto py-2 min-h-0">
                <div className="w-full flex flex-col gap-4 animate-fade-in-fast h-full max-h-full">
                    <div className="space-y-2 text-center md:text-left max-w-2xl mx-auto md:mx-0 flex-shrink-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit mx-auto md:mx-0">
                            <span className="material-symbols-outlined text-sm font-bold">edit_note</span>
                            Release
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white leading-[1.1]">
                            How are you feeling <br className="hidden md:block" />
                            <span className="text-slate-400 dark:text-slate-500 italic font-serif">in this moment?</span>
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 flex-1 items-stretch w-full min-h-0">
                        {/* Journaling Area */}
                        <div className="relative group flex-1 flex flex-col min-h-0">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-slate-600/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-xl overflow-hidden flex flex-col h-full flex-1 min-h-0">
                                <div className="px-4 py-2 md:px-6 md:py-3 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center text-slate-400 text-xs flex-shrink-0">
                                    <div className="flex gap-4">
                                        <span className="uppercase tracking-wider">Journal Entry</span>
                                        <span className="hidden sm:inline-block opacity-50">Just start typing...</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onMouseDown={(e) => { e.preventDefault(); handleFormat('bold'); }}
                                            className={`material-symbols-outlined text-base cursor-pointer hover:text-primary transition-colors focus:outline-none ${isBold ? 'text-primary' : ''}`}
                                        >
                                            format_bold
                                        </button>
                                        <button
                                            onMouseDown={(e) => { e.preventDefault(); handleFormat('italic'); }}
                                            className={`material-symbols-outlined text-base cursor-pointer hover:text-primary transition-colors focus:outline-none ${isItalic ? 'text-primary' : ''}`}
                                        >
                                            format_italic
                                        </button>
                                    </div>
                                </div>

                                <div
                                    contentEditable
                                    ref={editorRef}
                                    suppressContentEditableWarning={true}
                                    onInput={(e) => setJournalEntry(e.currentTarget.innerText)}
                                    onKeyUp={checkFormatState}
                                    onMouseUp={checkFormatState}
                                    className="flex-1 w-full bg-transparent border-none focus:ring-0 p-4 md:p-6 text-base md:text-lg leading-relaxed outline-none overflow-y-auto empty:before:content-[attr(placeholder)] empty:before:text-slate-300 dark:empty:before:text-slate-600 text-slate-700 dark:text-slate-200 caret-primary"
                                    placeholder="Let your thoughts flow freely here. Don't worry about grammar or structure. Just release..."
                                ></div>

                                <div className="px-6 py-4 bg-slate-50 dark:bg-[#15291d] border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center text-xs text-slate-400 rounded-b-xl">
                                    <div className="flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        <span>Saving automatically</span>
                                    </div>
                                    <span>{wordCount} words</span>
                                </div>
                            </div>
                        </div>

                        {/* Dual Sliders Sidebar */}
                        <div className="relative group w-full md:w-52 flex-shrink-0 flex flex-col min-h-[250px] md:min-h-0">
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-slate-600/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 z-0"></div>
                            <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-xl p-3 lg:p-4 flex flex-col h-full flex-1 border border-slate-100 dark:border-slate-700/50 z-10">

                                <div className="flex flex-row gap-4 h-full flex-1">
                                    {/* Stress Slider */}
                                    <div className="flex-1 flex flex-col items-center">
                                        <div className="text-center mb-3">
                                            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">Stress</span>
                                        </div>

                                        <div className="flex-1 relative flex flex-col items-center justify-center w-full py-2">
                                            <div className="text-red-400/80 mb-2">
                                                <span className="material-symbols-outlined text-lg">thunderstorm</span>
                                            </div>

                                            <div className="h-full relative flex items-center justify-center w-full px-2">
                                                <div className="absolute h-full w-[4px] bg-slate-700/30 rounded-full z-0"></div>
                                                <input
                                                    type="range"
                                                    orient="vertical"
                                                    min="0"
                                                    max="100"
                                                    value={stressLevel}
                                                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                                                    className="stress-slider appearance-none bg-transparent h-full w-full cursor-pointer z-10"
                                                    style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
                                                />
                                            </div>

                                            <div className="text-neon-green/80 mt-2">
                                                <span className="material-symbols-outlined text-lg">spa</span>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-center">
                                            <div className="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                                                {stressLevel}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Energy Slider */}
                                    <div className="flex-1 flex flex-col items-center">
                                        <div className="text-center mb-3">
                                            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">Energy</span>
                                        </div>

                                        <div className="flex-1 relative flex flex-col items-center justify-center w-full py-2">
                                            <div className="text-yellow-400/80 mb-2">
                                                <span className="material-symbols-outlined text-lg">bolt</span>
                                            </div>

                                            <div className="h-full relative flex items-center justify-center w-full px-2">
                                                <div className="absolute h-full w-[4px] bg-slate-700/30 rounded-full z-0"></div>
                                                <input
                                                    type="range"
                                                    orient="vertical"
                                                    min="0"
                                                    max="100"
                                                    value={energyLevel}
                                                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                                                    className="stress-slider appearance-none bg-transparent h-full w-full cursor-pointer z-10"
                                                    style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
                                                />
                                            </div>

                                            <div className="text-blue-400/80 mt-2">
                                                <span className="material-symbols-outlined text-lg">battery_low</span>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-center">
                                            <div className="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                                                {energyLevel}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-center items-center relative z-20 flex-shrink-0">
                <button
                    onClick={onContinue}
                    className="group flex items-center justify-center gap-2 bg-neon-green hover:bg-neon-green/90 text-background-dark font-bold text-base px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:-translate-y-1 w-full max-w-sm"
                >
                    <span>Continue to Step 2</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </footer>
        </div>
    );
}

export default JournalingMood;
