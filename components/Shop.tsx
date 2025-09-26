import React, { useState } from 'react';
import { UserProfile, CosmeticItem, ShopCategory, CosmeticType } from '../types';
import { GoldIcon } from './icons/StatIcons';
import { LockClosedIcon } from './icons/ExtraIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface ShopProps {
    userProfile: UserProfile;
    onPurchase: (item: CosmeticItem) => { success: boolean; message: string };
}

const ItemCard: React.FC<{
    item: CosmeticItem;
    userProfile: UserProfile;
    onPurchase: (item: CosmeticItem) => { success: boolean; message: string };
    t: (key: string, ...args: any[]) => string;
}> = ({ item, userProfile, onPurchase, t }) => {
    const { theme } = useTheme();
    const isOwned = userProfile.ownedCosmetics.includes(item.id);
    const isUnlocked = item.isUnlocked ? item.isUnlocked(userProfile) : true;
    const canAfford = userProfile.gold >= item.cost;
    
    const getUnlockProgressText = () => {
        if (item.id === 'frame_monthly_current' && !isUnlocked) {
            const today = new Date();
            const isCurrentMonthData = userProfile.monthlyWorkouts.year === today.getFullYear() && userProfile.monthlyWorkouts.month === today.getMonth();
            const currentMonthCount = isCurrentMonthData ? userProfile.monthlyWorkouts.count : 0;
            const needed = 25 - currentMonthCount;
            return t('shop.monthlyFrameProgress', needed);
        }
        return item.unlockHint || t('shop.lockedDefault');
    };

    const renderPreview = () => {
        switch (item.type) {
            case 'frame':
                return <div className={`w-20 h-20 bg-gray-700 rounded-md border-4 ${item.asset}`}></div>;
            case 'background':
                return <div className={`w-20 h-20 rounded-md ${item.asset}`}></div>;
            case 'avatar':
                return <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center text-4xl">{item.asset}</div>;
            default:
                return <div className="w-20 h-20 bg-gray-700 rounded-md"></div>;
        }
    };

    return (
        <div className={`bg-gray-800 p-4 rounded-lg border flex flex-col justify-between ${isUnlocked ? 'border-gray-700' : 'border-gray-600'}`}>
            <div className={`flex gap-4 ${!isUnlocked && !isOwned ? 'opacity-50 grayscale' : ''}`}>
                <div className="flex-shrink-0">
                    {renderPreview()}
                </div>
                <div className="flex-grow">
                    <h3 className="font-orbitron font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                </div>
            </div>
            <div className="mt-4">
                 {isOwned ? (
                    <button disabled className="w-full text-center py-2 rounded-md bg-green-800 text-green-300 font-bold cursor-not-allowed">
                        {t('shop.owned')}
                    </button>
                ) : !isUnlocked ? (
                    <div className="text-center py-2 rounded-md bg-gray-900 text-red-400 font-semibold text-xs">
                        <div className="flex items-center justify-center gap-2">
                             <LockClosedIcon className="w-4 h-4" />
                             <span>{getUnlockProgressText()}</span>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => onPurchase(item)}
                        disabled={!canAfford}
                        className={`w-full py-2 rounded-md text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed ${theme === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}
                    >
                        <GoldIcon className="w-5 h-5" />
                        <span>{t('shop.purchase', item.cost)}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

const Shop: React.FC<ShopProps> = ({ userProfile, onPurchase }) => {
    const { t, SHOP_CATEGORIES } = useLanguage();
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState<CosmeticType>('frame');

    const activeCategory = SHOP_CATEGORIES.find(cat => cat.type === activeTab);

    return (
        <div className="p-4 text-white animate-fade-in">
            <h2 className={`text-3xl font-orbitron font-bold text-center mb-6 ${theme === 'yellow' ? 'text-yellow-300' : 'text-cyan-300'}`}>{t('shop.title')}</h2>
            
            <div className="mb-6 flex justify-center border-b border-gray-700">
                {SHOP_CATEGORIES.map(cat => (
                    <button
                        key={cat.type}
                        onClick={() => setActiveTab(cat.type)}
                        className={`px-6 py-2 font-orbitron font-bold text-sm transition-colors ${activeTab === cat.type ? `border-b-2 ${theme === 'yellow' ? 'border-yellow-400 text-yellow-300' : 'border-cyan-400 text-cyan-300'}` : 'text-gray-400 hover:text-white'}`}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCategory?.items.map(item => (
                    <ItemCard key={item.id} item={item} userProfile={userProfile} onPurchase={onPurchase} t={t} />
                ))}
            </div>
        </div>
    );
};

export default Shop;