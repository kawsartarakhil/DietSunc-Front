'use client';
import React, { useEffect, useState } from 'react';
import { Heart, Clock, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('FavoritesPage');
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/profile/favorites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFavorites(data.favorites || []);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (mealId: string) => {
    try {
      // Optimistically remove from UI
      setFavorites(prev => prev.filter(m => m._id !== mealId));
      
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/profile/favorites', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealId })
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh] text-[#0bb28a] font-bold">  {t('loading')}</div>;
  }

  return (
<div className="w-full max-w-[1400px] mx-auto font-sans text-gray-800 dark:text-gray-200 space-y-10 pb-10 pt-14 md:pt-0 px-4 md:px-6 lg:px-8">      
      <div className="flex justify-between items-end bg-white dark:bg-gray-900 rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100   dark:border-gray-800">
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">  {t('title')}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-medium">
            {t('empty')}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {favorites.map((meal) => (
            <div key={meal._id} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100   dark:border-gray-800 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
              <button onClick={() => handleFavoriteToggle(meal._id)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-white dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 transition-colors">
                <Heart size={16} fill="currentColor" />
              </button>
              
              <div className="w-full h-32 rounded-2xl flex items-center justify-center bg-teal-50 text-teal-600 font-bold text-4xl mb-4">
                {meal.name.charAt(0)}
              </div>
              
              <span className="text-[10px] font-bold text-[#0bb28a] uppercase tracking-widest mb-1">{meal.type || 'Meal'}</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{meal.name}</h3>
              
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <Flame size={14} className="text-orange-500" />
                  {meal.calories} kcal
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <Clock size={14} className="text-blue-500" />
                  {meal.prepTime || 15} min
                </div>
              </div>

              {meal.instructions && (
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600 line-clamp-3">{meal.instructions}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}