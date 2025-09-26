import React, { useState, useEffect, useRef } from 'react';
import { DifficultyLevel, EquipmentOption, Workout, WorkoutType, MainView, AppState, ExerciseTiming } from './types';
import { useUserProfile } from './hooks/useUserProfile';
import { generateWorkout } from './services/geminiService';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';

// Components
import Header from './components/Header';
import WorkoutGenerator from './components/WorkoutGenerator';
import WorkoutDisplay from './components/WorkoutDisplay';
import WorkoutInProgress from './components/WorkoutInProgress';
import WorkoutSummary from './components/WorkoutSummary';
import CharacterCreation from './components/CharacterCreation';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import Profile from './components/Profile';
import Shop from './components/Shop';
import Achievements from './components/Achievements';
import RPG from './components/RPG';
import { Circles } from './components/icons/Loader';

const App: React.FC = () => {
    const { userProfile, setupProfile, completeWorkout, purchaseItem, equipItem, setRestDays, confirmStatAllocation, arceusPowerUp, toggleShowcaseAchievement } = useUserProfile();
    const { t } = useLanguage();
    const { theme } = useTheme();
    
    // Global App State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeView, setActiveView] = useState<MainView>('WORKOUT');
    
    // Workout Flow State
    const [appState, setAppState] = useState<AppState>('GENERATOR');
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

    const handleGenerateWorkout = async (difficulty: DifficultyLevel, equipment: EquipmentOption[], workoutType: WorkoutType, useYellowDudeInspiration: boolean) => {
        setIsLoading(true);
        setError(null);
        try {
            const workout = await generateWorkout(difficulty, equipment, workoutType, t, useYellowDudeInspiration);
            setCurrentWorkout(workout);
            setAppState('DISPLAY');
        } catch (err) {
            setError(t('error.generateWorkout'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleStartWorkout = () => setAppState('IN_PROGRESS');
    const handleCompleteWorkout = (timingData: ExerciseTiming[]) => {
        if (currentWorkout) {
            completeWorkout(currentWorkout.level, timingData);
            setAppState('SUMMARY');
        }
    };
    const handleNewWorkout = () => {
        setCurrentWorkout(null);
        setAppState('GENERATOR');
        setActiveView('WORKOUT');
    };

    const renderWorkoutView = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <Circles />
                    <p className={`mt-4 font-orbitron text-xl ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('loading.generating')}</p>
                    <p className="text-gray-400">{t('loading.generatingHint')}</p>
                </div>
            );
        }
        if (error) {
            return (
                <div className="text-center p-8 bg-red-900/50 border border-red-500 rounded-lg">
                    <p className="font-bold text-red-300">{t('error.title')}</p>
                    <p className="text-red-400 mt-2">{error}</p>
                    <button onClick={() => { setAppState('GENERATOR'); setError(null); }} className="mt-4 px-4 py-2 bg-red-600 rounded">{t('error.tryAgain')}</button>
                </div>
            );
        }
        switch (appState) {
            case 'GENERATOR': return <WorkoutGenerator onGenerate={handleGenerateWorkout} />;
            case 'DISPLAY': return currentWorkout && <WorkoutDisplay workout={currentWorkout} onStart={handleStartWorkout} onRegenerate={() => setAppState('GENERATOR')} />;
            case 'IN_PROGRESS': return currentWorkout && <WorkoutInProgress workout={currentWorkout} onComplete={handleCompleteWorkout} />;
            case 'SUMMARY': return userProfile && currentWorkout && <WorkoutSummary workout={currentWorkout} userProfile={userProfile} onNewWorkout={handleNewWorkout} />;
            default: return <WorkoutGenerator onGenerate={handleGenerateWorkout} />;
        }
    }

    const renderMainView = () => {
        if (!userProfile) return null;
        switch(activeView) {
            case 'WORKOUT': return renderWorkoutView();
            case 'PROFILE': return <Profile userProfile={userProfile} equipItem={equipItem} setRestDays={setRestDays} />;
            case 'SHOP': return <Shop userProfile={userProfile} onPurchase={purchaseItem} />;
            case 'ACHIEVEMENTS': return <Achievements userProfile={userProfile} toggleShowcase={toggleShowcaseAchievement} />;
            case 'RPG': return <RPG userProfile={userProfile} onConfirm={confirmStatAllocation} />;
            default: return renderWorkoutView();
        }
    }

    if (!userProfile) {
        return <CharacterCreation onProfileSetup={setupProfile} />;
    }
    
    const backgroundClass = userProfile.ownedCosmetics.includes(userProfile.equippedBackground || '') 
        ? userProfile.equippedBackground 
        : '';

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
            <div className={`fixed inset-0 bg-cover bg-center transition-opacity duration-1000 ${backgroundClass}`}></div>
            <div className="relative min-h-screen bg-black/60 backdrop-blur-sm">
                <Header userProfile={userProfile} activeView={activeView} />
                <div className="flex">
                    <SideNav activeView={activeView} onNavigate={setActiveView} />
                    <div className="flex-1">
                         <div className="container mx-auto p-2 md:p-4 max-w-7xl">
                            {/* Header placeholder to push content down */}
                            <div className="h-28"></div> 
                            <main className="pb-20 md:pb-4">
                                {renderMainView()}
                            </main>
                        </div>
                    </div>
                </div>
                <BottomNav activeView={activeView} onNavigate={setActiveView} />
            </div>
        </div>
    );
};

export default App;