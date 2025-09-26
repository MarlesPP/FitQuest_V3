import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface CharacterCreationProps {
    onProfileSetup: (gender: 'male' | 'female', name: string) => void;
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({ onProfileSetup }) => {
    const { language, setLanguage, t } = useLanguage();
    const { theme } = useTheme();
    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
    const [name, setName] = useState('');

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center bg-gray-800/50 border border-gray-700 rounded-2xl shadow-2xl p-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-gray-700 rounded-full p-1 flex">
                        <button 
                            onClick={() => setLanguage('es')}
                            className={`px-4 py-1 text-sm font-bold rounded-full ${language === 'es' ? (theme === 'yellow' ? 'bg-yellow-500' : 'bg-cyan-500') + ' text-white' : 'text-gray-300'}`}
                        >
                            Español
                        </button>
                        <button 
                            onClick={() => setLanguage('en')}
                            className={`px-4 py-1 text-sm font-bold rounded-full ${language === 'en' ? (theme === 'yellow' ? 'bg-yellow-500' : 'bg-cyan-500') + ' text-white' : 'text-gray-300'}`}
                        >
                            English
                        </button>
                    </div>
                </div>
                
                <h1 className="text-4xl font-black font-orbitron text-white">{t('character.title')}</h1>
                <p className="text-gray-400 mt-2">{t('character.subtitle')}</p>
                
                <div className="mt-8">
                    <label htmlFor="heroName" className="block text-lg font-bold text-gray-300 mb-2 font-orbitron">
                        {t('character.nameLabel')}
                    </label>
                    <input
                        id="heroName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('character.namePlaceholder')}
                        className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white text-center font-semibold placeholder-gray-500 focus:outline-none transition-colors ${theme === 'yellow' ? 'border-gray-600 focus:border-yellow-500' : 'border-gray-600 focus:border-cyan-500'}`}
                    />
                </div>

                <div className="mt-6">
                     <p className="text-gray-400 mt-2">{t('character.genderLabel')}</p>
                     <div className="mt-4 grid grid-cols-2 gap-6">
                        <button
                            onClick={() => setSelectedGender('male')}
                            className={`p-4 rounded-lg border-4 transition-all duration-200 ${selectedGender === 'male' ? (theme === 'yellow' ? 'border-yellow-400 bg-yellow-900/50' : 'border-cyan-400 bg-cyan-900/50') : 'border-gray-600 bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <div className="text-6xl">👨</div>
                            <div className="mt-2 font-bold font-orbitron text-xl">{t('character.male')}</div>
                        </button>
                        <button
                            onClick={() => setSelectedGender('female')}
                            className={`p-4 rounded-lg border-4 transition-all duration-200 ${selectedGender === 'female' ? 'border-pink-400 bg-pink-900/50' : 'border-gray-600 bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <div className="text-6xl">👩</div>
                            <div className="mt-2 font-bold font-orbitron text-xl">{t('character.female')}</div>
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={() => selectedGender && onProfileSetup(selectedGender, name)}
                        disabled={!selectedGender}
                        className={`w-full px-12 py-4 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 font-orbitron tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${theme === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                    >
                        {t('character.submit')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterCreation;