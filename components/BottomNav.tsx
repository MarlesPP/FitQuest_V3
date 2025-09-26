import React from 'react';
import { MainView } from '../types';
import { WorkoutIcon, ProfileIcon, ShopIcon, AchievementsIcon, RPGIcon } from './icons/NavIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface BottomNavProps {
    activeView: MainView;
    onNavigate: (view: MainView) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    view: MainView;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, view, isActive, onClick }) => {
    const { theme } = useTheme();
    const activeColor = theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? activeColor : 'text-gray-400 hover:text-white'}`}
            aria-label={`Navigate to ${label}`}
        >
            {icon}
            <span className={`text-xs font-bold ${isActive ? activeColor : 'text-gray-500'}`}>{label}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
    const { t } = useLanguage();
    
    const navItems: { view: MainView, icon: React.ReactNode }[] = [
        { view: 'WORKOUT', icon: <WorkoutIcon /> },
        { view: 'RPG', icon: <RPGIcon /> },
        { view: 'PROFILE', icon: <ProfileIcon /> },
        { view: 'SHOP', icon: <ShopIcon /> },
        { view: 'ACHIEVEMENTS', icon: <AchievementsIcon /> },
    ];
    
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 flex justify-around md:hidden z-50">
            {navItems.map(item => (
                <NavItem 
                    key={item.view}
                    icon={item.icon} 
                    label={t(`views.${item.view}`)}
                    view={item.view}
                    isActive={activeView === item.view} 
                    onClick={() => onNavigate(item.view)} 
                />
            ))}
        </nav>
    );
};

export default BottomNav;