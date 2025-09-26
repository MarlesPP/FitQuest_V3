import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { es } from '../locales/es';
import { en } from '../locales/en';
import { Achievement, CosmeticItem, EquipmentOption, ShopCategory, WorkoutType } from '../types';
import { getAchievements, getShopCategories, getEquipmentOptions, getRpgRewards } from '../locales/content';
import { RPG_REWARDS as BASE_RPG_REWARDS } from '../data/RPG';

type Language = 'es' | 'en';

type Translations = typeof es;
const translations: { [key in Language]: Translations } = { es, en };

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: keyof Translations | string, ...args: any[]) => string;
    ACHIEVEMENTS: Achievement[];
    SHOP_CATEGORIES: ShopCategory[];
    EQUIPMENT_OPTIONS: EquipmentOption[];
    RPG_REWARDS: Array<CosmeticItem & { unlockLevel: number }>;
    WORKOUT_TYPES: WorkoutType[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        try {
            const savedLang = localStorage.getItem('fitquest-language') as Language;
            return (savedLang && (savedLang === 'es' || savedLang === 'en')) ? savedLang : 'es';
        } catch {
            return 'es';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('fitquest-language', language);
        } catch (error) {
            console.error("Failed to save language to localStorage", error);
        }
    }, [language]);
    
    const t = useCallback((key: string, ...args: any[]): string => {
        const keys = key.split('.');
        let result: any = translations[language];
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                // Fallback to English if key not found in current language
                result = translations.en;
                 for (const k_fb of keys) {
                    if (result && typeof result === 'object' && k_fb in result) {
                        result = result[k_fb];
                    } else {
                        return key; // Return key if not found in either
                    }
                }
                break;
            }
        }
        
        if (typeof result === 'string') {
            if (args.length > 0) {
                return result.replace(/{(\d+)}/g, (match, number) => {
                    return typeof args[number] !== 'undefined' ? args[number] : match;
                });
            }
            return result;
        }

        return key;
    }, [language]);
    
    const WORKOUT_TYPES = useMemo(() => Object.values(WorkoutType), []);

    const contextValue = useMemo(() => ({
        language,
        setLanguage,
        t,
        ACHIEVEMENTS: getAchievements(t),
        SHOP_CATEGORIES: getShopCategories(t),
        EQUIPMENT_OPTIONS: getEquipmentOptions(t),
        RPG_REWARDS: getRpgRewards(t, BASE_RPG_REWARDS),
        WORKOUT_TYPES
    }), [language, t, WORKOUT_TYPES]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
