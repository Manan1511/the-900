import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import JournalingMood from './components/JournalingMood';
import LocationSelection from './components/LocationSelection';
import GuidedBreathing from './components/GuidedBreathing';
import SessionSummary from './components/SessionSummary';
import SuggestedActivity from './components/SuggestedActivity';
import { fetchGeminiActivity } from './api/gemini';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  // Shared State
  const [stressLevel, setStressLevel] = useState(50);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [location, setLocation] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [suggestedActivity, setSuggestedActivity] = useState('');

  // Flow handlers
  const handleStart = () => {
    setCurrentScreen('journaling');
  };

  const handleJournalingComplete = () => {
    setCurrentScreen('location');
  };

  const handleLocationComplete = async () => {
    setCurrentScreen('loading');
    try {
      // API Call for Suggested Activity
      const activity = await fetchGeminiActivity(stressLevel, energyLevel, location);
      setSuggestedActivity(activity);
      setCurrentScreen('suggested');
    } catch (error) {
      console.error("Error fetching activity:", error);
      setSuggestedActivity("Take a 5-minute screen break by finding a textured object nearby and observing its details.");
      setCurrentScreen('suggested');
    }
  };

  const handleSuggestedComplete = () => {
    setCurrentScreen('breathing');
  };

  const handleBreathingComplete = () => {
    setCurrentScreen('summary');
  };

  const handleReturnHome = () => {
    // Reset state for a new session
    setStressLevel(50);
    setEnergyLevel(50);
    setLocation('');
    setJournalEntry('');
    setSuggestedActivity('');
    setCurrentScreen('landing');
  };

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex flex-col">
      {/* Global Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 z-0 opacity-40 dot-grid dot-layer"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/30 to-background-light dark:via-background-dark/30 dark:to-background-dark z-0"></div>
      </div>

      {currentScreen === 'landing' && <LandingPage onStart={handleStart} />}
      {currentScreen === 'journaling' && (
        <JournalingMood
          onContinue={handleJournalingComplete}
          journalEntry={journalEntry}
          setJournalEntry={setJournalEntry}
          stressLevel={stressLevel}
          setStressLevel={setStressLevel}
          energyLevel={energyLevel}
          setEnergyLevel={setEnergyLevel}
        />
      )}
      {currentScreen === 'location' && (
        <LocationSelection
          location={location}
          setLocation={setLocation}
          onNext={handleLocationComplete}
        />
      )}
      {currentScreen === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center w-full h-screen relative bg-background-dark z-50">
          <div className="absolute inset-0 rounded-full animate-pulse-slow bg-primary/20 blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col items-center gap-6 z-10 animate-fade-in">
            <span className="material-symbols-outlined text-[64px] text-primary animate-pulse">auto_awesome</span>
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Creating your session...</h2>
            <p className="text-slate-400">Tailoring your experience based on your input.</p>
          </div>
        </div>
      )}
      {currentScreen === 'suggested' && (
        <SuggestedActivity
          suggestedActivity={suggestedActivity}
          onComplete={handleSuggestedComplete}
        />
      )}
      {currentScreen === 'breathing' && (
        <GuidedBreathing
          onComplete={handleBreathingComplete}
        />
      )}
      {currentScreen === 'summary' && (
        <SessionSummary
          stressLevel={stressLevel}
          location={location}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
}

export default App;
