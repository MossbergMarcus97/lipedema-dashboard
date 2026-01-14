'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');

  const treatmentData = [
    { name: 'Kun konsultasjon', value: 114, percent: 56.4 },
    { name: 'Operert ved IbsenSykehusene', value: 65, percent: 32.2 },
    { name: 'Operert andre steder', value: 11, percent: 5.4 },
    { name: 'Operert begge steder', value: 12, percent: 5.9 }
      ];

  const rand12Data = [
    { domain: 'GH', fullName: 'Generell helse', consultation: 39.2, operated: 50.6 },
    { domain: 'PF', fullName: 'Fysisk funksjon', consultation: 61.0, operated: 73.4 },
    { domain: 'RP', fullName: 'Fysisk rollefunksjon', consultation: 25.5, operated: 50.0 },
    { domain: 'BP', fullName: 'Kroppssmerter', consultation: 50.0, operated: 62.5 },
    { domain: 'VT', fullName: 'Vitalitet', consultation: 21.4, operated: 34.8 },
    { domain: 'SF', fullName: 'Sosial funksjon', consultation: 60.0, operated: 67.5 },
    { domain: 'RE', fullName: 'Emosjonell rollefunksjon', consultation: 26.9, operated: 51.9 },
    { domain: 'MH', fullName: 'Mental helse', consultation: 47.6, operated: 61.5 }
      ];

  const compositeData = [
    { name: 'PCS (Fysisk)', consultation: 44.0, operated: 59.1 },
    { name: 'MCS (Mental)', consultation: 37.8, operated: 53.1 }
      ];

  const symptomData = [
    { symptom: 'Smerter', consultation: 3.19, operated: 2.57 },
    { symptom: 'Blaamerker', consultation: 2.92, operated: 2.15 },
    { symptom: 'Tyngdefoelelse', consultation: 3.42, operated: 2.41 },
    { symptom: 'Begrensninger', consultation: 2.42, operated: 1.98 }
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

  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lipedema Studie Dashboard</h1>
            <p className="text-gray-500">IbsenSykehusene | August 2021 - August 2025</p>
    </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-gray-500 text-sm">Totalt invitert</p>
              <p className="text-3xl font-bold text-indigo-600">719</p>
    </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-gray-500 text-sm">Respondenter</p>
              <p className="text-3xl font-bold text-indigo-600">202</p>
    </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-gray-500 text-sm">Opererte</p>
              <p className="text-3xl font-bold text-indigo-600">285</p>
    </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-gray-500 text-sm">Periode</p>
              <p className="text-3xl font-bold text-indigo-600">4 aar</p>
    </div>
    </div>

        <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-2 rounded-2xl">
  {['overview', 'health', 'symptoms', 'employment'].map(tab => (
                <button
                                                                      key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
{tab === 'overview' ? 'Oversikt' : tab === 'health' ? 'Helsestatus' : tab === 'symptoms' ? 'Symptomer' : 'Arbeid'}
</button>
          ))}
</div>

{activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Behandlingskategorier</h3>
               <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={treatmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
{treatmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                      </Pie>
                  <Tooltip />
                      </PieChart>
                      </ResponsiveContainer>
                      </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Helsescorer</h3>
              <ResponsiveContainer width="100%" height={300}>
                                      <BarChart data={compositeData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" domain={[0, 100]} />
                                        <YAxis dataKey="name" type="category" width={100} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} />
                  <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} />
                      </BarChart>
                      </ResponsiveContainer>
                      </div>
                      </div>
        )}

{activeTab === 'health' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">RAND-12 Domenescorer</h3>
             <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rand12Data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="domain" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} />
                <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} />
  </BarChart>
  </ResponsiveContainer>
  </div>
         )}

{activeTab === 'symptoms' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Symptomer (0-4 skala)</h3>
             <ResponsiveContainer width="100%" height={350}>
                <BarChart data={symptomData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 4]} />
                  <YAxis dataKey="symptom" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} />
                <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} />
  </BarChart>
  </ResponsiveContainer>
  </div>
         )}

{activeTab === 'employment' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Arbeidsdeltagelse (%)</h3>
             <ResponsiveContainer width="100%" height={400}>
                <BarChart data={employmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis domain={[0, 60]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultation" name="Konsultasjon" fill={CHART_COLORS.consultation} />
                <Bar dataKey="operated" name="Operert" fill={CHART_COLORS.operated} />
  </BarChart>
  </ResponsiveContainer>
  </div>
         )}

        <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Data fra IbsenSykehusene | N = 202 respondenter</p>
          </div>
          </div>
          </div>
  );
}
