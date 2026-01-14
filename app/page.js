'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
      const [activeTab, setActiveTab] = useState('overview');

  const treatmentData = [
      { name: 'Kun konsultasjon', value: 114, percent: 56.4 },
      { name: 'Operert ved IbsenSykehusene', value: 65, percent: 32.2 },
      { name: 'Operert andre steder', value: 11, percent: 5.4 },
      { name: 'Operert begge steder', value: 12, percent: 5.9 }
        ];

  const rand12Data = [
      { domain: 'GH', fullName: 'Generell helse', consultation: 39.2, operated: 50.6, diff: 11.4 },
      { domain: 'PF', fullName: 'Fysisk funksjon', consultation: 61.0, operated: 73.4, diff: 12.4 },
      { domain: 'RP', fullName: 'Fysisk rollefunksjon', consultation: 25.5, operated: 50.0, diff: 24.5 },
      { domain: 'BP', fullName: 'Kroppssmerter', consultation: 50.0, operated: 62.5, diff: 12.5 },
      { domain: 'VT', fullName: 'Vitalitet', consultation: 21.4, operated: 34.8, diff: 13.4 },
      { domain: 'SF', fullName: 'Sosial funksjon', consultation: 60.0, operated: 67.5, diff: 7.5 },
      { domain: 'RE', fullName: 'Emosjonell rollefunksjon', consultation: 26.9, operated: 51.9, diff: 25.1 },
      { domain: 'MH', fullName: 'Mental helse', consultation: 47.6, operated: 61.5, diff: 13.9 }
        ];

  const compositeData = [
      { name: 'PCS (Fysisk)', consultation: 44.0, operated: 59.1, diff: 15.2 },
      { name: 'MCS (Mental)', consultation: 37.8, operated: 53.1, diff: 15.3 }
        ];

  const symptomData = [
      { symptom: 'Smerter', consultation: 3.19, operated: 2.57, improvement: 19.4 },
      { symptom: 'Blaamerker', consultation: 2.92, operated: 2.15, improvement: 26.4 },
      { symptom: 'Tyngdefoelelse', consultation: 3.42, operated: 2.41, improvement: 29.5 },
      { symptom: 'Begrensninger', consultation: 2.42, operated: 1.98, improvement: 18.2 }
        ];

  const employmentData = [
      { status: 'Heltid', consultation: 40.9, operated: 55.9 },
      { status: 'Deltid', consultation: 14.0, operated: 13.2 },
      { status: 'Sykmeldt', consultation: 15.1, operated: 8.8 },
      { status: 'Ufoeretrygd', consultation: 22.6, operated: 16.2 },
      { status: 'Ikke i arbeid', consultation: 7.5, operated: 5.9 }
        ];

  const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
      const CHART_COLORS = { consultation: '#ef4444', operated: '#22c55e' };

  const StatCard = ({ title, value, subtitle }) => (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-indigo-600">{value}</p>
    {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
       );

      const TabButton = ({ id, label, active }) => (
              <button onClick={() => setActiveTab(id)} className={`px-6 py-3 rounded-xl font-medium transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
    {label}
    </button>
      );

  return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lipedema Studie Dashboard</h1>
                  <p className="text-gray-500">IbsenSykehusene | August 2021 - August 2025</p>
      </div>
      </div>
      </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="Totalt invitert" value="719" subtitle="Pasienter kontaktet" />
                <StatCard title="Respondenter" value="202" subtitle="28% svarprosent" />
                <StatCard title="Opererte pasienter" value="285" subtitle="700 prosedyrer totalt" />
                <StatCard title="Studieperiode" value="4 ar" subtitle="Aug 2021 - Aug 2025" />
      </div>
            <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-2 rounded-2xl">
                <TabButton id="overview" label="Oversikt" active={activeTab === 'overview'} />
                <TabButton id="health" label="Helsestatus" active={activeTab === 'health'} />
                <TabButton id="symptoms" label="Symptomer" active={activeTab === 'symptoms'} />
                <TabButton id="employment" label="Arbeid" active={activeTab === 'employment'} />
      </div>
    {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Behandlingskategorier</h3>
                     <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie data={treatmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ percent }) => `${percent.toFixed(1)}%`}>
    {treatmentData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
    </Pie>
                    <Tooltip />
    </PieChart>
    </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
{treatmentData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                         <span className="text-gray-600">{item.name}</span>
                   </div>
                                     ))}
</div>
    </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sammensatte helsescorer</h3>
                <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={compositeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[0, 4, 4, 0]} />
                        <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[0, 4, 4, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
    </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Hovedfunn</h3>
              <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                      <p className="text-3xl font-bold">+15.2</p>
                  <p className="text-indigo-100 text-sm">Fysisk helsescore forbedring</p>
    </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                      <p className="text-3xl font-bold">+15.3</p>
                  <p className="text-indigo-100 text-sm">Mental helsescore forbedring</p>
    </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                      <p className="text-3xl font-bold">-24%</p>
                  <p className="text-indigo-100 text-sm">Redusert symptombelastning</p>
    </div>
    </div>
    </div>
    </div>
        )}
{activeTab === 'health' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">RAND-12 Domenescorer</h3>
               <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={rand12Data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="domain" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[4, 4, 0, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
             <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Helseprofil Radar</h3>
               <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={rand12Data}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="fullName" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Konsultasjon" dataKey="consultation" stroke={CHART_COLORS.consultation} fill={CHART_COLORS.consultation} fillOpacity={0.3} />
                      <Radar name="Operert" dataKey="operated" stroke={CHART_COLORS.operated} fill={CHART_COLORS.operated} fillOpacity={0.3} />
                      <Legend />
    </RadarChart>
    </ResponsiveContainer>
    </div>
    </div>
        )}
{activeTab === 'symptoms' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Symptomer (0-4 skala)</h3>
               <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={symptomData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" domain={[0, 4]} />
                      <YAxis dataKey="symptom" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[0, 4, 4, 0]} />
                      <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[0, 4, 4, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
             <div className="grid md:grid-cols-4 gap-4">
{symptomData.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">-{item.improvement.toFixed(0)}%</span>
                 </div>
                                   <h4 className="font-semibold text-gray-800">{item.symptom}</h4>
                                   <p className="text-gray-500 text-sm mt-1">{item.consultation.toFixed(2)} til {item.operated.toFixed(2)}</p>
    </div>
              ))}
                  </div>
                  </div>
        )}
{activeTab === 'employment' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Arbeidsdeltagelse (%)})</h3>
            'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
      const [activeTab, setActiveTab] = useState('overview');

  const treatmentData = [
      { name: 'Kun konsultasjon', value: 114, percent: 56.4 },
      { name: 'Operert ved IbsenSykehusene', value: 65, percent: 32.2 },
      { name: 'Operert andre steder', value: 11, percent: 5.4 },
      { name: 'Operert begge steder', value: 12, percent: 5.9 }
        ];

  const rand12Data = [
      { domain: 'GH', fullName: 'Generell helse', consultation: 39.2, operated: 50.6, diff: 11.4 },
      { domain: 'PF', fullName: 'Fysisk funksjon', consultation: 61.0, operated: 73.4, diff: 12.4 },
      { domain: 'RP', fullName: 'Fysisk rollefunksjon', consultation: 25.5, operated: 50.0, diff: 24.5 },
      { domain: 'BP', fullName: 'Kroppssmerter', consultation: 50.0, operated: 62.5, diff: 12.5 },
      { domain: 'VT', fullName: 'Vitalitet', consultation: 21.4, operated: 34.8, diff: 13.4 },
      { domain: 'SF', fullName: 'Sosial funksjon', consultation: 60.0, operated: 67.5, diff: 7.5 },
      { domain: 'RE', fullName: 'Emosjonell rollefunksjon', consultation: 26.9, operated: 51.9, diff: 25.1 },
      { domain: 'MH', fullName: 'Mental helse', consultation: 47.6, operated: 61.5, diff: 13.9 }
        ];

  const compositeData = [
      { name: 'PCS (Fysisk)', consultation: 44.0, operated: 59.1, diff: 15.2 },
      { name: 'MCS (Mental)', consultation: 37.8, operated: 53.1, diff: 15.3 }
        ];

  const symptomData = [
      { symptom: 'Smerter', consultation: 3.19, operated: 2.57, improvement: 19.4 },
      { symptom: 'Blaamerker', consultation: 2.92, operated: 2.15, improvement: 26.4 },
      { symptom: 'Tyngdefoelelse', consultation: 3.42, operated: 2.41, improvement: 29.5 },
      { symptom: 'Begrensninger', consultation: 2.42, operated: 1.98, improvement: 18.2 }
        ];

  const employmentData = [
      { status: 'Heltid', consultation: 40.9, operated: 55.9 },
      { status: 'Deltid', consultation: 14.0, operated: 13.2 },
      { status: 'Sykmeldt', consultation: 15.1, operated: 8.8 },
      { status: 'Ufoeretrygd', consultation: 22.6, operated: 16.2 },
      { status: 'Ikke i arbeid', consultation: 7.5, operated: 5.9 }
        ];

  const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
      const CHART_COLORS = { consultation: '#ef4444', operated: '#22c55e' };

  const StatCard = ({ title, value, subtitle }) => (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-indigo-600">{value}</p>
    {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
       );

      const TabButton = ({ id, label, active }) => (
              <button onClick={() => setActiveTab(id)} className={`px-6 py-3 rounded-xl font-medium transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
    {label}
    </button>
      );

  return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lipedema Studie Dashboard</h1>
                  <p className="text-gray-500">IbsenSykehusene | August 2021 - August 2025</p>
      </div>
      </div>
      </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="Totalt invitert" value="719" subtitle="Pasienter kontaktet" />
                <StatCard title="Respondenter" value="202" subtitle="28% svarprosent" />
                <StatCard title="Opererte pasienter" value="285" subtitle="700 prosedyrer totalt" />
                <StatCard title="Studieperiode" value="4 ar" subtitle="Aug 2021 - Aug 2025" />
      </div>
            <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-2 rounded-2xl">
                <TabButton id="overview" label="Oversikt" active={activeTab === 'overview'} />
                <TabButton id="health" label="Helsestatus" active={activeTab === 'health'} />
                <TabButton id="symptoms" label="Symptomer" active={activeTab === 'symptoms'} />
                <TabButton id="employment" label="Arbeid" active={activeTab === 'employment'} />
      </div>
    {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Behandlingskategorier</h3>
                     <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie data={treatmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ percent }) => `${percent.toFixed(1)}%`}>
    {treatmentData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
    </Pie>
                    <Tooltip />
    </PieChart>
    </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
{treatmentData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                         <span className="text-gray-600">{item.name}</span>
                   </div>
                                     ))}
</div>
    </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sammensatte helsescorer</h3>
                <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={compositeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[0, 4, 4, 0]} />
                        <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[0, 4, 4, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
    </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Hovedfunn</h3>
              <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                      <p className="text-3xl font-bold">+15.2</p>
                  <p className="text-indigo-100 text-sm">Fysisk helsescore forbedring</p>
    </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                      <p className="text-3xl font-bold">+15.3</p>
                  <p className="text-indigo-100 text-sm">Mental helsescore forbedring</p>
    </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                      <p className="text-3xl font-bold">-24%</p>
                  <p className="text-indigo-100 text-sm">Redusert symptombelastning</p>
    </div>
    </div>
    </div>
    </div>
        )}
{activeTab === 'health' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">RAND-12 Domenescorer</h3>
               <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={rand12Data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="domain" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[4, 4, 0, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
             <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Helseprofil Radar</h3>
               <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={rand12Data}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="fullName" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Konsultasjon" dataKey="consultation" stroke={CHART_COLORS.consultation} fill={CHART_COLORS.consultation} fillOpacity={0.3} />
                      <Radar name="Operert" dataKey="operated" stroke={CHART_COLORS.operated} fill={CHART_COLORS.operated} fillOpacity={0.3} />
                      <Legend />
    </RadarChart>
    </ResponsiveContainer>
    </div>
    </div>
        )}
{activeTab === 'symptoms' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Symptomer (0-4 skala)</h3>
               <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={symptomData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" domain={[0, 4]} />
                      <YAxis dataKey="symptom" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[0, 4, 4, 0]} />
                      <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[0, 4, 4, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
             <div className="grid md:grid-cols-4 gap-4">
{symptomData.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">-{item.improvement.toFixed(0)}%</span>
                 </div>
                                   <h4 className="font-semibold text-gray-800">{item.symptom}</h4>
                                   <p className="text-gray-500 text-sm mt-1">{item.consultation.toFixed(2)} til {item.operated.toFixed(2)}</p>
    </div>
              ))}
                  </div>
                  </div>
        )}
{activeTab === 'employment' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Arbeidsdeltagelse (%)})</h3>
              <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={employmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="status" />
                      <YAxis domain={[0, 60]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} radius={[4, 4, 0, 0]} />
    </BarChart>
    </ResponsiveContainer>
    </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                  <h4 className="font-semibold mb-4">Nokkeltall</h4>
              <div className="grid md:grid-cols-2 gap-6">
                    <div><p className="text-4xl font-bold">+15%</p><p className="text-blue-100">Okning i heltidsarbeid</p></div>
                <div><p className="text-4xl font-bold">-42%</p><p className="text-blue-100">Reduksjon i sykefravaer</p></div>
    </div>
    </div>
    </div>
        )}
        <div className="mt-8 text-center text-gray-500 text-sm">
                      <p>Data fra IbsenSykehusene | N = 202 respondenter</p>
            </div>
            </div>
            </div>
  );
}
