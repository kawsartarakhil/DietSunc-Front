'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dashPic from '@/public/dashPic.webp';
import {
  Weight,
  Target,
  Droplets,
  Dumbbell,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function ProfileSetupPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('ProfileSetupPage');

  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('Female');
  const [weight, setWeight] = useState('68');
  const [height, setHeight] = useState('170');
  const [goal, setGoal] = useState('Lose Weight');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (data.success && data.profile) {
          setAge(String(data.profile.age));
          setGender(data.profile.gender);
          setWeight(String(data.profile.weight));
          setHeight(String(data.profile.height));

          setGoal(
            data.profile.goal === 'lose'
              ? 'Lose Weight'
              : data.profile.goal === 'gain'
              ? 'Gain Muscle'
              : 'Maintain'
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleCalculate = async () => {
    try {
      const backendGoal =
        goal === 'Lose Weight'
          ? 'lose'
          : goal === 'Gain Muscle'
          ? 'gain'
          : 'maintain';

      await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          age: Number(age),
          gender,
          weight: Number(weight),
          height: Number(height),
          goal: backendGoal
        })
      });

      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error(err);
      router.push(`/${locale}/dashboard`);
    }
  };

  const w = Number(weight) || 0;
  const h = Number(height) || 1;
  const a = Number(age) || 25;

  const bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
  const water = (w * 0.033).toFixed(1);

  let bmr =
    gender === 'Male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

  let tdee = bmr * 1.375;

  let cals = Math.round(tdee);
  if (goal === 'Lose Weight') cals -= 500;
  if (goal === 'Gain Muscle') cals += 500;

  return (
<div className="w-full max-w-5xl mx-auto space-y-12 text-gray-800 dark:text-gray-200">
        {/* HEADER */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* FORM + IMAGE */}
      <div className="grid md:grid-cols-2 gap-8 items-start">

        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800">

          {/* INPUTS */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            <Input label={t('age')} value={age} onChange={setAge} type="number" />
            <Select
              label={t('gender')}
              value={gender}
              onChange={setGender}
              options={[t('female'), t('male'), t('other')]}
            />
            <Input label={t('weight')} value={weight} onChange={setWeight} type="number" />
            <Input label={t('height')} value={height} onChange={setHeight} type="number" />
          </div>

          {/* GOALS */}
          <div className="space-y-3 mb-8">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {t('goal')}
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              {['Lose Weight', 'Maintain', 'Gain Muscle'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                    goal === g
                      ? 'bg-teal-100/50 border-teal-200 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-[#0bb28a] hover:bg-[#099b77] text-white font-bold py-3.5 rounded-2xl"
          >
            {t('save')}
          </button>
        </div>

        {/* IMAGE */}
        <div className="relative rounded-[2rem] overflow-hidden min-h-[400px]">
          <Image
            src={dashPic}
            alt="Nutrition"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 text-white">
            <div>
              <h3 className="text-2xl font-bold">
                {t('precisionTitle')}
              </h3>
              <p className="text-white/80 text-sm">
                {t('precisionDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <MetricCard icon={<Weight />} title={t('bmi')} value={bmi} />
        <MetricCard icon={<Target />} title={t('dailyTarget')} value={cals} />
        <MetricCard icon={<Droplets />} title={t('hydration')} value={water} />
        <MetricCard icon={<Dumbbell />} title={t('movement')} value="45" />
      </div>

      {/* NEXT STEPS */}
      <div className="bg-[#0f6b55] rounded-[2rem] p-8 text-white">
        <h3 className="text-xl font-bold mb-3">{t('nextSteps')}</h3>
        <p className="text-white/80 mb-6">{t('nextDesc')}</p>

        <button
          onClick={handleCalculate}
          className="w-full bg-white dark:bg-gray-900 text-[#0f6b55] font-bold py-3 rounded-xl"
        >
          {t('dashboard')}
        </button>
      </div>

    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function Input({ label, value, onChange, type }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-gray-500 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-gray-500 uppercase">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      >
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function MetricCard({ icon, title, value }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 text-center border border-gray-100 dark:border-gray-800">
      <div className="mb-3">{icon}</div>
      <h4 className="text-xs font-bold text-gray-500 uppercase">{title}</h4>
      <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}