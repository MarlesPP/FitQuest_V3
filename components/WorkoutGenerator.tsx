import React, { useState } from 'react';
import { DifficultyLevel, EquipmentOption, WorkoutType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface WorkoutGeneratorProps {
    onGenerate: (difficulty: DifficultyLevel, equipment: EquipmentOption[], workoutType: WorkoutType, useYellowDudeInspiration: boolean) => void;
}

const WorkoutGenerator: React.FC<WorkoutGeneratorProps> = ({ onGenerate }) => {
    const { t, EQUIPMENT_OPTIONS, WORKOUT_TYPES } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
    const [workoutType, setWorkoutType] = useState<WorkoutType>(WorkoutType.FULL_BODY);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentOption[]>([]);

    const toggleEquipment = (equipment: EquipmentOption) => {
        setSelectedEquipment(prev =>
            prev.find(e => e.id === equipment.id)
                ? prev.filter(e => e.id !== equipment.id)
                : [...prev, equipment]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const useYellowDudeInspiration = theme === 'yellow';
        onGenerate(difficulty, selectedEquipment, workoutType, useYellowDudeInspiration);
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 animate-fade-in">
            <h2 className={`text-3xl font-orbitron font-bold text-center mb-6 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('generator?.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-bold text-gray-300 mb-2 font-orbitron">{t('generator.difficulty')}</label>
                    <div className="grid grid-cols-3 gap-3">
                        {Object.values(DifficultyLevel).map(level => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setDifficulty(level)}
                                className={`px-4 py-3 rounded-md font-semibold transition-all duration-200 ${difficulty === level ? (theme === 'yellow' ? 'bg-yellow-500' : 'bg-cyan-500') + ' text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                {t(`difficultyLevels.${level}`)}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-lg font-bold text-gray-300 mb-2 font-orbitron">{t('generator.focus')}</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {WORKOUT_TYPES.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setWorkoutType(type)}
                                className={`px-4 py-3 rounded-md font-semibold transition-all duration-200 text-sm ${workoutType === type ? (theme === 'yellow' ? 'bg-yellow-500' : 'bg-cyan-500') + ' text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                {t(`workoutTypes.${type}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-bold text-gray-300 mb-2 font-orbitron">{t('generator.equipment')}</label>
                    <p className="text-sm text-gray-400 mb-3">{t('generator.equipmentHint')}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {EQUIPMENT_OPTIONS.map(item => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleEquipment(item)}
                                className={`flex flex-col items-center justify-center p-3 rounded-md transition-all duration-200 border-2 ${selectedEquipment.some(e => e.id === item.id) ? (theme === 'yellow' ? 'bg-yellow-900/50 border-yellow-500' : 'bg-cyan-900/50 border-cyan-500') : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                            >
                                <item.icon className={`w-8 h-8 mb-2 ${theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}`} />
                                <span className="text-xs font-semibold text-gray-200">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-bold text-gray-300 mb-2 font-orbitron">{t('generator.inspiration')}</label>
                     <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-white">{t('generator.yellowDudeLabel')}</p>
                            <p className="text-xs text-gray-400 max-w-xs">{t('generator.yellowDudeHint')}</p>
                        </div>
                        <label htmlFor="yellow-dude-toggle" className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                id="yellow-dude-toggle" 
                                className="sr-only peer"
                                checked={theme === 'yellow'}
                                onChange={toggleTheme}
                            />
                            <div className={`w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${theme === 'yellow' ? 'peer-focus:ring-yellow-400 peer-checked:bg-yellow-500' : 'peer-focus:ring-cyan-400 peer-checked:bg-cyan-500'} peer-checked:after:translate-x-full peer-checked:after:border-white`}></div>
                        </label>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className={`w-full px-12 py-4 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 font-orbitron tracking-wider ${theme === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                    >
                        {t('generator.submit')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkoutGenerator;
