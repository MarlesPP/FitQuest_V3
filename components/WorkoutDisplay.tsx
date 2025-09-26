import React from 'react';
import { Workout, WorkoutSection } from '../types';
import { XP_PER_WORKOUT } from '../constants';
import { ClockIcon, DumbbellIcon, FlameIcon, MedalIcon } from './icons/StatIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface WorkoutDisplayProps {
    workout: Workout;
    onStart: () => void;
    onRegenerate: () => void;
}

const ExerciseCard: React.FC<{ exercise: any; index: number }> = ({ exercise, index }) => {
    const { theme } = useTheme();
    return (
        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start">
                <h4 className={`text-lg font-bold ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{index + 1}. {exercise.name}</h4>
                <div className={`text-sm px-2 py-1 rounded-full font-semibold ${theme === 'yellow' ? 'bg-yellow-800 text-yellow-200' : 'bg-cyan-800 text-cyan-200'}`}>{exercise.sets}x {exercise.reps}</div>
            </div>
            <p className="mt-2 text-sm text-gray-400">{exercise.description}</p>
            <div className="mt-3 text-xs text-gray-500 flex items-center gap-4">
                <span><strong>Muscles:</strong> {exercise.muscles}</span>
                <span><strong>Equipment:</strong> {exercise.equipment}</span>
            </div>
        </div>
    );
};

const SectionDisplay: React.FC<{ section: WorkoutSection }> = ({ section }) => {
    const { theme } = useTheme();
    return (
        <div className="mb-8">
            <h3 className={`text-2xl font-orbitron font-bold mb-4 text-gray-100 border-b-2 pb-2 ${theme === 'yellow' ? 'border-yellow-500' : 'border-cyan-500'}`}>{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.exercises.map((ex, index) => (
                    <ExerciseCard key={index} exercise={ex} index={index} />
                ))}
            </div>
        </div>
    );
};

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ workout, onStart, onRegenerate }) => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const xpReward = XP_PER_WORKOUT[workout.level] || 100;
    const iconColor = theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';

    return (
        <div className="animate-fade-in">
            <h2 className={`text-4xl font-black font-orbitron text-center mb-2 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{workout.workoutName}</h2>
            
            <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-700/50 p-3 rounded-lg"><DumbbellIcon className={`mx-auto mb-1 h-6 w-6 ${iconColor}`} />{t(`difficultyLevels.${workout.level}`)}</div>
                <div className="bg-gray-700/50 p-3 rounded-lg"><ClockIcon className={`mx-auto mb-1 h-6 w-6 ${iconColor}`} />{workout.estimatedTime}</div>
                <div className="bg-gray-700/50 p-3 rounded-lg"><MedalIcon className={`mx-auto mb-1 h-6 w-6 ${iconColor}`} />+{xpReward} XP</div>
                <div className="bg-gray-700/50 p-3 rounded-lg"><FlameIcon className={`mx-auto mb-1 h-6 w-6 ${iconColor}`} />{t(`workoutTypes.${workout.workoutType}`)}</div>
            </div>

            <div className="space-y-8">
                <SectionDisplay section={workout.warmup} />
                <SectionDisplay section={workout.mainWorkout} />
                <SectionDisplay section={workout.cooldown} />
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
                <button
                    onClick={onRegenerate}
                    className="w-full md:w-auto px-8 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-500 transition-colors font-orbitron"
                >
                    {t('display.regenerate')}
                </button>
                <button
                    onClick={onStart}
                    className={`w-full md:w-auto px-12 py-4 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 font-orbitron tracking-wider ${theme === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                >
                    {t('display.begin')}
                </button>
            </div>
        </div>
    );
};

export default WorkoutDisplay;