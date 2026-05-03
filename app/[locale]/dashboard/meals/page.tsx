'use client';
import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock, Flame, ListFilter, PlayCircle, Heart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authFetch } from '@/lib/api';

export default function MealsPage() {
  const t = useTranslations('MealsPage');
  const router = useRouter();
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  useEffect(() => {
    fetchMealPlan();
  }, []);

  const fetchMealPlan = async () => {
    try {
      const data = await authFetch('/api/meals/generate-plan');
      if (data.success) {
        setMealPlan(data.mealPlan);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleFavorite = async (mealId: string) => {
    try {
      await authFetch('/api/profile/favorites', {
        method: 'POST',
        body: JSON.stringify({ mealId }),
      });
      router.push('/dashboard/favorites');
    } catch (err) {
      console.error(err);
    }
  };


  if (loading) {
return (
  <div className="flex items-center justify-center min-h-[50vh] text-teal-600 font-bold">
    {t('loading')}
  </div>
);  }

  const mealsList = [
    { type: 'Breakfast', data: mealPlan?.breakfast },
    { type: 'Lunch', data: mealPlan?.lunch },
    { type: 'Dinner', data: mealPlan?.dinner },
    { type: 'Snack', data: mealPlan?.snack }
  ];

  return (
<div className="w-full font-sans text-gray-800 space-y-10 pb-10 px-4 md:px-6 lg:px-8">      
      <div className="flex justify-between items-end bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
  {t('title')}
</h1>

<p className="text-gray-500 text-sm leading-relaxed">
  {t('subtitle')}
</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-50 text-gray-600 px-4 py-2.5 rounded-xl font-bold text-sm border border-gray-200 hover:bg-gray-100 transition-colors">
            <ListFilter size={18} />
          {t('filter')}
          </button>
          <button onClick={fetchMealPlan} className="flex items-center gap-2 bg-[#0bb28a] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#099b77] transition-colors">
            <CalendarDays size={18} />
            {t('regeneratePlan')}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {mealsList.map((meal, idx) => (
          meal.data ? (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition-shadow relative">
              <button onClick={() => handleFavorite(meal.data._id)} className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors">
                 <Heart size={20} />
              </button>
              <div className="w-24 h-24 rounded-2xl shrink-0 flex items-center justify-center bg-teal-50 text-teal-600 font-bold text-2xl">
                {meal.data.name.charAt(0)}
              </div>
              <div className="flex-1 flex flex-col pt-1">
                <span className="text-[10px] font-bold text-[#0bb28a] uppercase tracking-widest mb-1">{meal.type === 'Breakfast' && t('breakfast')}
{meal.type === 'Lunch' && t('lunch')}
{meal.type === 'Dinner' && t('dinner')}
{meal.type === 'Snack' && t('snack')}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-6 leading-tight">{meal.data.name}</h3>
                
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <Flame size={14} className="text-orange-500" />
                    {meal.data.calories} kcal
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <Clock size={14} className="text-blue-500" />
                    {meal.data.prepTime || 15} min
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <button onClick={() => setSelectedRecipe(meal.data)} className="text-sm font-bold text-[#0bb28a] hover:text-[#099b77] transition-colors">{t('viewRecipe')} →</button>
                  <button onClick={() => setSelectedRecipe(meal.data)} className="text-gray-400 hover:text-[#0bb28a] transition-colors">
                    <PlayCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedRecipe(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedRecipe.name}</h2>
            <div className="flex gap-4 mb-6">
               <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded">{selectedRecipe.calories} kcal</span>
               <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">{selectedRecipe.prepTime || 15} min prep</span>
            </div>
            
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 border-b pb-2">{t('ingredients')}</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-600 text-sm space-y-1">
              {(selectedRecipe.ingredients || []).map((ing: string, i: number) => (
                <li key={i} className="capitalize">{ing}</li>
              ))}
            </ul>

            <h3 className="font-bold text-gray-900 dark:text-white mb-3 border-b pb-2">{t('instructions')}</h3>
            <div className="text-gray-600 text-sm leading-relaxed space-y-2 whitespace-pre-line">
              {selectedRecipe.instructions || t('defaultInstructions')}
            </div>

            <button onClick={() => handleFavorite(selectedRecipe._id)} className="w-full mt-8 bg-[#0bb28a] text-white py-3 rounded-xl font-bold hover:bg-[#099b77] transition-colors flex justify-center items-center gap-2">
              <Heart size={18} /> {t('addToFavorites')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
