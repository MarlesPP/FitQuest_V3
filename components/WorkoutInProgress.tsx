import React, { useState, useEffect, useMemo } from 'react';
import { Workout, ExerciseTiming } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface WorkoutInProgressProps {
    workout: Workout;
    onComplete: (timingData: ExerciseTiming[]) => void;
}

type WorkoutState = 'EXERCISE' | 'REST' | 'COMPLETED';

const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ workout, onComplete }) => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const allExercises = useMemo(() => [
        ...workout.warmup.exercises.map(e => ({ ...e, section: workout.warmup.title })),
        ...workout.mainWorkout.exercises.map(e => ({ ...e, section: workout.mainWorkout.title })),
        ...workout.cooldown.exercises.map(e => ({ ...e, section: workout.cooldown.title })),
    ], [workout]);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [workoutState, setWorkoutState] = useState<WorkoutState>('EXERCISE');
    const [timer, setTimer] = useState(0);
    const [exerciseTimings, setExerciseTimings] = useState<ExerciseTiming[]>([]);
    
    const currentExercise = allExercises[currentExerciseIndex];
    const timeLimit = workoutState === 'EXERCISE' ? currentExercise.estimatedTimeInSeconds : currentExercise.restAfterInSeconds;

    const handleNext = () => {
        // If we are finishing an exercise, calculate timing and update state
        if (workoutState === 'EXERCISE') {
            const timeTaken = currentExercise.estimatedTimeInSeconds - timer;
            const newTiming: ExerciseTiming = {
                exerciseName: currentExercise.name,
                timeTaken: timeTaken > 0 ? timeTaken : 1,
                estimatedTime: currentExercise.estimatedTimeInSeconds,
            };
            
            const finalTimings = [...exerciseTimings, newTiming];
            setExerciseTimings(finalTimings); // Update state for future renders
    
            // Check for completion
            if (currentExerciseIndex >= allExercises.length - 1) {
                setWorkoutState('COMPLETED');
                onComplete(finalTimings); // Pass the fresh array
                return;
            }
    
            // Check for rest period
            if (currentExercise.restAfterInSeconds > 0) {
                setWorkoutState('REST');
                return;
            }
        }
    
        // This point is reached after a REST or after an EXERCISE with no rest.
        // Move to the next exercise.
        if (currentExerciseIndex < allExercises.length - 1) {
             setCurrentExerciseIndex(prev => prev + 1);
             setWorkoutState('EXERCISE');
        } else {
            // Fallback to complete if somehow we get here at the end
             setWorkoutState('COMPLETED');
             onComplete(exerciseTimings);
        }
    };

    useEffect(() => {
        if (!currentExercise) return;
        setTimer(timeLimit > 0 ? timeLimit : 1);
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleNext();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [currentExerciseIndex, workoutState]);
    
    if (!currentExercise) {
        return <div>{t('inProgress.loading')}</div>;
    }
    
    return (
        <div className="animate-fade-in text-center">
             <div className="mb-4">
                <h3 className="text-xl font-orbitron text-gray-400">{currentExercise.section}</h3>
                <p className="text-sm text-gray-500">{t('inProgress.exerciseCount', currentExerciseIndex + 1, allExercises.length)}</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl min-h-[350px] flex flex-col justify-around">
                <div>
                    <div className={`mb-2 font-orbitron text-2xl font-bold ${workoutState === 'REST' ? 'text-green-400' : (theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300')}`}>
                        {workoutState === 'REST' ? t('inProgress.restTitle') : t('inProgress.exerciseTitle')}
                    </div>
                    <h2 className="text-4xl font-extrabold font-orbitron text-white">
                         {workoutState === 'REST' ? t('inProgress.restMessage') : currentExercise.name}
                    </h2>
                </div>
                
                <div className="my-4">
                    {workoutState === 'EXERCISE' && (
                         <div className="text-5xl font-black text-white">{currentExercise.sets} x {currentExercise.reps}</div>
                    )}
                    <p className="text-gray-300 max-w-xl mx-auto mt-2">{workoutState === 'EXERCISE' ? currentExercise.description : `${t('inProgress.nextUp')} ${allExercises[currentExerciseIndex + 1]?.name || t('inProgress.finishing')}`}</p>
                </div>
                
                <div>
                    <div className="w-48 h-48 rounded-full border-8 border-gray-700 mx-auto flex items-center justify-center">
                        <div className="font-mono text-5xl font-bold text-white">
                            {Math.floor(timer/60).toString().padStart(2,'0')}:{Math.floor(timer%60).toString().padStart(2,'0')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={handleNext}
                    className={`w-full md:w-3/4 px-12 py-4 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 font-orbitron tracking-wider ${theme === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                >
                    {workoutState === 'REST' ? t('inProgress.skipRest') : t('inProgress.nextExercise')}
                </button>
            </div>
        </div>
    );
};

export default WorkoutInProgress;