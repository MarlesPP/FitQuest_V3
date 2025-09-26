import React from 'react';
import { MainView } from '../types';
import { WorkoutIcon, ProfileIcon, ShopIcon, AchievementsIcon, RPGIcon } from './icons/NavIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface SideNavProps {
    activeView: MainView;
    onNavigate: (view: MainView) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    const { theme } = useTheme();
    const activeColor = theme === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full py-4 transition-colors duration-200 ${isActive ? `${activeColor} bg-gray-700/50` : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
            aria-label={`Navigate to ${label}`}
        >
            {icon}
            <span className={`text-xs font-bold mt-1 ${isActive ? activeColor : 'text-gray-500'}`}>{label}</span>
        </button>
    );
};

const SideNav: React.FC<SideNavProps> = ({ activeView, onNavigate }) => {
    const { t } = useLanguage();
    
    const navItems: { view: MainView, icon: React.ReactNode }[] = [
        { view: 'WORKOUT', icon: <WorkoutIcon /> },
        { view: 'RPG', icon: <RPGIcon /> },
        { view: 'PROFILE', icon: <ProfileIcon /> },
        { view: 'SHOP', icon: <ShopIcon /> },
        { view: 'ACHIEVEMENTS', icon: <AchievementsIcon /> },
    ];
    
    return (
        <nav className="hidden md:flex flex-col w-24 bg-gray-900/80 border-r border-gray-700 h-screen sticky top-0 z-40">
            <div className="flex-grow">
                 {navItems.map(item => (
                    <NavItem 
                        key={item.view}
                        icon={item.icon} 
                        label={t(`views.${item.view}`)}
                        isActive={activeView === item.view} 
                        onClick={() => onNavigate(item.view)} 
                    />
                 ))}
            </div>
        </nav>
    );
};

export default SideNav;