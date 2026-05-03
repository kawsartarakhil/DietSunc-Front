'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import userPic from '@/public/userPic.png';
import { TrendingUp, Droplet, Plus, Heart, Calendar, FileText, X, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authFetch } from '@/lib/api';

export default function DashboardPage() {
  const t = useTranslations('DashboardPage');
  const router = useRouter();

  // 🌙 DARK MODE (ADDED)
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const [profile, setProfile] = useState<any>(null);
  const [todayMeal, setTodayMeal] = useState<any>(null);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [groceryList, setGroceryList] = useState<string[]>([]);
  
  const [fridgeIngredients, setFridgeIngredients] = useState('');
  const [bestMatch, setBestMatch] = useState<any>(null);
  const [otherMatches, setOtherMatches] = useState<any[]>([]);
  const [showGroceryModal, setShowGroceryModal] = useState(false);
  const [checkedGroceries, setCheckedGroceries] = useState<string[]>([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

const fetchDashboardData = async () => {
  try {
    const profData = await authFetch('/api/profile');
    if (profData.success) {
      setProfile(profData.profile);
      if (profData.profile.groceryChecklist) {
        setCheckedGroceries(profData.profile.groceryChecklist);
      }
    }

    const mealData = await authFetch('/api/meals/generate');
    if (mealData.success) setTodayMeal(mealData.meal);

    const planData = await authFetch('/api/meals/generate-plan');
    if (planData.success) {
      setMealPlan(planData.mealPlan);
      setGroceryList(planData.groceryList);
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleRecommend = async () => {
    try {
      const ingredients = fridgeIngredients.split(',').map(s => s.trim()).filter(Boolean);
      if (!ingredients.length) return;
      
      const data = await authFetch('/api/meals/recommend', {
  method: 'POST',
  body: JSON.stringify({ ingredients })
});
      if (data.success) {
        setBestMatch(data.bestMatch);
        setOtherMatches(data.meals.slice(1, 3));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async (mealId: string) => {
    try {
      await authFetch('/api/profile/favorites', {
  method: 'POST',
  body: JSON.stringify({ mealId })
});

      showAlert('❤️ Added to favorites');
    } catch (err) {
      console.error(err);
      showAlert('Failed to add favorite');
    }
  };

  const handleAddToPlan = () => {
    showAlert('Success! Meal has been scheduled in your daily plan.');
  };

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  const toggleGroceryCheck = async (item: string) => {
    const newChecked = checkedGroceries.includes(item) 
      ? checkedGroceries.filter(i => i !== item)
      : [...checkedGroceries, item];
      
    setCheckedGroceries(newChecked);
  };

  const w = profile?.weight || 68;
  const h = profile?.height || 170;
  const a = profile?.age || 25;
  const gen = profile?.gender || 'Female';
  
  const bmi = profile ? (w / Math.pow(h / 100, 2)).toFixed(1) : '22.4';
  const water = profile ? (w * 0.033).toFixed(1) : '2.2';

  let bmr = gen === 'Male'
    ? (10 * w) + (6.25 * h) - (5 * a) + 5
    : (10 * w) + (6.25 * h) - (5 * a) - 161;

  let tdee = bmr * 1.375;
  let targetCals = Math.round(tdee);
  if (profile?.goal === 'lose') targetCals -= 500;
  if (profile?.goal === 'gain') targetCals += 500;

  const targetProtein = Math.round((targetCals * 0.3) / 4);
  const targetCarbs = Math.round((targetCals * 0.4) / 4);
  const targetFats = Math.round((targetCals * 0.3) / 9);

  return (
<div className={`${darkMode ? 'dark' : ''} w-full font-sans text-gray-800 dark:text-gray-200 space-y-12 pb-10 relative px-4 md:px-8 xl:px-12`}>   {alertMsg && (
        <div className="fixed top-6 right-6 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-xl font-bold z-50 animate-bounce">
          {alertMsg}
        </div>
      )}

      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>

          <p className="text-gray-500 text-sm font-medium mt-1 dark:text-gray-300">
            {t('welcome')}
          </p>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest dark:text-gray-400">
              {t('todayDate')}
            </p>
            <p className="text-[#0bb28a] font-bold text-sm">
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>

          <Image src={userPic} alt="User" width={40} height={40} className="rounded-full" />
        </div>
      </div>
<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100   dark:border-gray-800 dark:bg-gray-900
dark:border-gray-800">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('dailySummary')}</h2>
              <span className="bg-[#bdf059] text-[#4d6a13] text-[10px] font-bold px-2 py-1 rounded-md">{t('onTrack')}</span>
            </div>
            <TrendingUp className="text-[#0bb28a] cursor-pointer hover:text-teal-600" size={20} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-[6px] border-[#0bb28a] flex items-center justify-center mb-3">
                <div className="text-center">
                  <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{targetCals}</p>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">KCAL</p>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-600"> {t('calorieTarget')}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-black text-[#bdf059] mb-1">{bmi}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">{Number(bmi) < 18.5 ? 'UNDER' : Number(bmi) > 25 ? 'OVER' : 'NORMAL'}</p>
              <p className="text-xs font-bold text-gray-600">  {t('bmi')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-[6px] border-[#0f6b55] flex items-center justify-center mb-3">
                <div className="text-center">
                  <Droplet className="mx-auto mb-0.5" size={14} />
                  <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{water}L</p>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-600">  {t('waterIntake')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100   dark:border-gray-800 flex flex-col dark:bg-gray-900
dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">  {t('macroSplit')}</h2>
          <div className="space-y-4 flex-1">
            <MacroRow label="Protein" current={`${Math.round(targetProtein * 0.8)}g`} total={`${targetProtein}g`} pct="80%" color="bg-[#0f6b55]" />
            <MacroRow label="Carbs" current={`${Math.round(targetCarbs * 0.82)}g`} total={`${targetCarbs}g`} pct="82%" color="bg-[#0bb28a]" />
            <MacroRow label="Fats" current={`${Math.round(targetFats * 0.69)}g`} total={`${targetFats}g`} pct="69%" color="bg-[#bdf059]" />
          </div>
          <button onClick={() => router.push('/profile-setup')} className="w-full mt-6 py-2.5 rounded-xl border border-[#0bb28a] text-[#0bb28a] font-bold text-sm hover:bg-teal-50 transition-colors">
             {t('adjustTargets')}
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">  {t('inspiration')}</h2>
          <button onClick={fetchDashboardData} className="flex items-center gap-2 bg-[#0bb28a] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[#099b77] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            {t('generateMeal')}
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-gray-100   dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden bg-gr">
          <div className="w-48 h-48 rounded-full bg-teal-50 flex flex-col items-center justify-center shrink-0 shadow-inne dark:opacity-60">
            <span className="text-teal-600 font-bold text-5xl ">{todayMeal?.name?.charAt(0) || 'M'}</span>
            <span className="mt-2 bg-white  text-teal-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm">  {t('featuredRecipe')}</span>
          </div>
          
          <div className="flex-1 py-4 pr-0 md:pr-16 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#0f6b55] mb-3 ">{todayMeal?.name || `${t('defaultMeal')}`}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="bg-teal-50 text-[#0bb28a] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ">{t('highProtein')}
</span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">{t('glutenFree')}</span>
              <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">{t('glutenFree')}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              A nutrient-dense combination that perfectly aligns with your wellness goals. Contains: {todayMeal?.ingredients?.slice(0, 4).join(', ') || 'Quinoa, Chicken, Chickpeas, Kale'}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 border-t border-gray-100 pt-4 text-left">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Calories</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{todayMeal?.calories || 540} <span className="text-gray-400 font-medium text-xs">kcal</span></p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Key Ingredients</p>
                <p className="text-sm font-bold text-gray-600">{todayMeal?.ingredients?.slice(0, 3).join(', ') || 'Quinoa, Chicken, Chickpeas'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={handleAddToPlan} className="bg-[#0f6b55] hover:bg-[#0c5745] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex-1">
               {t('addToPlan')}
              </button>
              <button onClick={() => todayMeal?._id && handleFavorite(todayMeal._id)} className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors m-5">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">  {t('fullMealPlan')}</h2>
          <button onClick={fetchDashboardData} className="flex items-center gap-2 border border-teal-200 text-[#0bb28a] px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-gray-900 hover:bg-teal-50 transition-colors">
            <Calendar size={16} />
            {t('generateFullMealPlan')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MealCard type="Breakfast" name={mealPlan?.breakfast?.name || "Berry Almond Oats"} cals={`${mealPlan?.breakfast?.calories || 320} kcal`} bg="dark:bg-gray-600 bg-gray-200 hover:border-2 border-[#0bb28a]" />
          <MealCard type="Lunch" name={mealPlan?.lunch?.name || "Salmon Cobb Salad"} cals={`${mealPlan?.lunch?.calories || 480} kcal`} bg="dark:bg-gray-600 bg-gray-200 hover:border-2 border-[#0bb28a]" />
          <MealCard type="Dinner" name={mealPlan?.dinner?.name || "Lemon Herb Salmon"} cals={`${mealPlan?.dinner?.calories || 610} kcal`} bg="dark:bg-gray-600 bg-gray-200 hover:border-2 border-[#0bb28a]"  />
          
          <div className="bg-[#edf6f1] dark:bg-gray-800 rounded-3xl p-5 border border-teal-100 flex flex-col">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t('snack')}</h4>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-3 flex gap-3 items-center mb-4 shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-[10px] font-black text-green-700">iOS</div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">{mealPlan?.snack?.name || "Greek Yogurt"}</p>
                <p className="text-[10px] text-gray-500">{mealPlan?.snack?.calories || 150} kcal</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900/60 rounded-xl p-4 flex-1 border border-teal-50">
              <div className="flex justify-between items-center mb-3">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('groceryList')}</h5>
                <FileText size={12} className="text-gray-400" />
              </div>
              <ul className="space-y-2 mb-4">
                {(groceryList.length > 0 ? groceryList.slice(0, 3) : ['Quinoa', 'Salmon fillet', 'Greek yogurt']).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <span className="w-3 h-3 shrink-0 rounded-full border border-gray-300"></span>
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowGroceryModal(true)} className="text-[10px] font-bold text-[#0bb28a] uppercase tracking-widest hover:underline">{t('VFL')}</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('smartRecommendation')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-gray-100   dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('fridgeTitle')}</h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">{t('fridgeDesc')}</p>
            <textarea 
              value={fridgeIngredients}
              onChange={e => setFridgeIngredients(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-500 mb-2 h-24 resize-none dark:bg-gray-800"
              placeholder={`${t('fridgePlaceholder')}`}
            ></textarea>
            <p className="text-[10px] text-gray-400 text-right mb-4">{fridgeIngredients.length}/100</p>
            <button onClick={handleRecommend} className="w-full bg-[#0bb28a] hover:bg-[#099b77] text-white py-2.5 rounded-xl font-bold text-sm transition-colors mb-4">
             {t('bestMatches')}
            </button>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-1 rounded uppercase">Popular: Chicken</span>
              <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-1 rounded uppercase">Tofu</span>
              <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-1 rounded uppercase">Sweet Potato</span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
             <div className="bg-[#edf6f1] rounded-[1.5rem] p-4 flex flex-col sm:flex-row gap-4 items-start border border-teal-100 dark:bg-gray-800">
               <div className="w-20 h-20 bg-teal-600 text-white text-3xl font-bold rounded-xl relative shrink-0 flex items-center justify-center">
                 <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black text-[8px] font-black uppercase text-center py-0.5 z-10 rounded-t-xl">{t('findMatches')}</div>
                 {bestMatch?.name?.charAt(0) || 'A'}
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-gray-900 dark:text-white text-sm">{bestMatch?.name || 'Avocado Mushroom Omelette'}</h4>
                 <p className="text-xs text-gray-500 mb-2">"{bestMatch?.matchScore || 98}% match with your ingredients"</p>
                 <div className="flex flex-wrap gap-4 mb-2">
                   <span className="text-[#0bb28a] text-[10px] font-bold flex items-center gap-1">⚡ Smart Match</span>
                   <span className="text-gray-400 text-[10px] font-medium flex items-center gap-1">⏱ {bestMatch?.prepTime || 12} min</span>
                 </div>
                 {bestMatch?.instructions && (
                   <div className="bg-white dark:bg-gray-400/60 p-2.5 rounded-lg text-xs text-gray-700 leading-relaxed border border-teal-50">
                     <span className="font-bold block mb-1">Instructions:</span>
                     {bestMatch.instructions}
                   </div>
                 )}
               </div>
               <div className="flex flex-row sm:flex-col gap-2 shrink-0 self-end sm:self-auto mt-4 sm:mt-0">
                 <div className="w-12 h-12 rounded-full bg-[#0bb28a] text-white flex flex-col items-center justify-center">
                   <span className="text-lg font-black leading-none">{bestMatch?.matchScore || 98}</span>
                   <span className="text-[6px] uppercase tracking-widest font-bold">Score</span>
                 </div>
                 <button onClick={() => todayMeal?._id && handleFavorite(todayMeal._id)} className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                <Heart size={20} />
              </button>
               </div>
             </div>

             {otherMatches[0] && (
               <button onClick={() => setSelectedRecipe(otherMatches[0])} className="bg-white dark:bg-gray-900 rounded-2xl p-4 flex items-center justify-between border border-gray-100   dark:border-gray-800 shadow-sm hover:border-[#0bb28a] transition-colors w-full text-left cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">2</span>
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm">{otherMatches[0].name}</h5>
                      <p className="text-[10px] text-gray-400">{otherMatches[0].matchScore}% Match</p>
                    </div>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                    <div className="h-full bg-[#0bb28a] rounded-full" style={{ width: `${otherMatches[0].matchScore}%` }}></div>
                  </div>
               </button>
             )}

             {otherMatches[1] && (
               <button onClick={() => setSelectedRecipe(otherMatches[1])} className="bg-white dark:bg-gray-900 rounded-2xl p-4 flex items-center justify-between border border-gray-100   dark:border-gray-800 shadow-sm hover:border-gray-400 transition-colors w-full text-left cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">3</span>
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm">{otherMatches[1].name}</h5>
                      <p className="text-[10px] text-gray-400">{otherMatches[1].matchScore}% Match</p>
                    </div>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                    <div className="h-full bg-gray-400 rounded-full" style={{ width: `${otherMatches[1].matchScore}%` }}></div>
                  </div>
               </button>
             )}
          </div>
        </div>
      </div>

      {showGroceryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 max-w-sm w-full relative max-h-[80vh] overflow-y-auto dark:bg-gray-900">
            <button onClick={() => setShowGroceryModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:text-white">
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('groceryList')}</h2>
            </div>
            
            <ul className="space-y-3">
              {(groceryList.length > 0 ? groceryList : ['Quinoa', 'Salmon fillet', 'Greek yogurt', 'Spinach', 'Chicken Breast', 'Olive Oil', 'Cherry Tomatoes']).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium p-3 bg-gray-50 rounded-xl border border-gray-100   dark:border-gray-800">
                  <input 
                    type="checkbox" 
                    checked={checkedGroceries.includes(item)}
                    onChange={() => toggleGroceryCheck(item)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer" 
                  />
                  <span className={`flex-1 ${checkedGroceries.includes(item) ? 'line-through text-gray-400' : ''}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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
              {selectedRecipe.instructions || "Mix ingredients and cook until ready. Enjoy!"}
            </div>
<button onClick={() => todayMeal?._id && handleFavorite(todayMeal._id)} className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                <Heart size={20} />
              </button>
          </div>
        </div>
      )}

    </div>
  );
}


// Shows a macro nutrient progress row (like protein, carbs, fat)
// Includes a label, numbers, and a progress bar
function MacroRow({ label, current, total, pct, color }: any) {
  return (
    <div>

      {/* Top row: label on left, numbers on right */}
      <div className="flex justify-between text-xs font-bold mb-1.5">

        {/* Macro name (e.g. Protein, Carbs) */}
        <span className="text-gray-500">{label}</span>

        {/* Current vs total (e.g. 45 / 100g) */}
        <span className="text-gray-900 dark:text-white">
          {current}{" "}
          <span className="text-gray-400 font-medium">/ {total}</span>
        </span>

      </div>

      {/* Background bar (empty track) */}
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">

        {/* Width is controlled dynamically using pct (like "60%") */}
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: pct }}
        ></div>

      </div>
    </div>
  );
}


// A card for a meal (breakfast, lunch, dinner, etc.)
// Shows a placeholder image area + meal name + calories
function MealCard({ type, name, cals, bg, textWhite }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 border border-gray-100   dark:border-gray-800 shadow-sm flex flex-col">

      {/* Small label like "BREAKFAST" or "DINNER" */}
      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
        {type}
      </h4>

      {/* Instead of a real image, we just show a colored box with a big initial */}
      <div
        className={`w-full h-32 rounded-2xl ${bg} mb-4 flex items-center justify-center`}
      >
        <span
          className={`text-4xl font-bold opacity-30 ${
            textWhite ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}
        >
          {name?.charAt(0) || 'M'}
        </span>
      </div>

      <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
        {name}
      </h5>

      <p className="text-[#0bb28a] text-xs font-bold">
        {cals}
      </p>

    </div>
  );
}