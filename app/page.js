'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';

const treatmentData = [
  { name: 'Konsultasjon alene', value: 114 },
  { name: 'Kirurgisk behandlet ved IbsenSykehusene', value: 65 },
  { name: 'Kirurgisk behandlet andre steder', value: 11 },
  { name: 'Kirurgisk behandlet både ved IbsenSykehusene og andre steder', value: 12 }
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
  { symptom: 'Blåmerker', consultation: 2.92, operated: 2.15 },
  { symptom: 'Tyngdefølelse', consultation: 3.42, operated: 2.41 },
  { symptom: 'Mobilitetsbegrensninger', consultation: 2.42, operated: 1.98 }
];

const employmentData = [
  { status: 'Heltid', consultation: 40.9, operated: 55.9 },
  { status: 'Deltid', consultation: 14.0, operated: 13.2 },
  { status: 'Sykmeldt', consultation: 15.1, operated: 8.8 },
  { status: 'Uføretrygd', consultation: 22.6, operated: 16.2 },
  { status: 'Ikke i arbeid', consultation: 7.5, operated: 5.9 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
const CHART_COLORS = { consultation: '#ef4444', operated: '#22c55e' };

const formatDecimal = (value, digits = 1) => value.toFixed(digits);
const formatPercent = (value, digits = 0) => value.toFixed(digits);
const averageByKey = (data, key) =>
  data.reduce((sum, item) => sum + item[key], 0) / data.length;
const delta = (from, to) => to - from;
const reductionPercent = (from, to) => ((from - to) / from) * 100;
const getTabId = (id) => `tab-${id}`;
const getPanelId = (id) => `panel-${id}`;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const physicalComposite = compositeData.find((item) => item.name.startsWith('PCS'));
  const mentalComposite = compositeData.find((item) => item.name.startsWith('MCS'));
  const physicalDiff = physicalComposite
    ? delta(physicalComposite.consultation, physicalComposite.operated)
    : 0;
  const mentalDiff = mentalComposite
    ? delta(mentalComposite.consultation, mentalComposite.operated)
    : 0;
  const averageCompositeDiff = (physicalDiff + mentalDiff) / 2;

  const avgSymptomConsultation = averageByKey(symptomData, 'consultation');
  const avgSymptomOperated = averageByKey(symptomData, 'operated');
  const avgSymptomReduction = reductionPercent(avgSymptomConsultation, avgSymptomOperated);

  const fullTime = employmentData.find((item) => item.status === 'Heltid');
  const sickLeave = employmentData.find((item) => item.status === 'Sykmeldt');
  const fullTimeIncrease = fullTime
    ? delta(fullTime.consultation, fullTime.operated)
    : 0;
  const sickLeaveReduction = sickLeave
    ? reductionPercent(sickLeave.consultation, sickLeave.operated)
    : 0;

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const TabButton = ({ id, label, active }) => {
    const tabId = getTabId(id);
    const panelId = getPanelId(id);

    return (
      <button
        type="button"
        id={tabId}
        role="tab"
        aria-selected={active}
        aria-controls={panelId}
        tabIndex={active ? 0 : -1}
        onClick={() => setActiveTab(id)}
        className={`px-6 py-3 rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
      >
        {label}
      </button>
    );
  };

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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">State of Lipedema 2026</h1>
              <p className="text-gray-500">IbsenSykehusene | Aug 2021–Aug 2025</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Totalt invitert" value="719" subtitle="Pasienter kontaktet" />
          <StatCard title="Respondenter" value="202" subtitle="28% svarprosent" />
          <StatCard title="Kirurgisk behandlede pasienter" value="285" subtitle="700 prosedyrer totalt" />
          <StatCard title="Studieperiode" value="4 år" subtitle="Aug 2021–Aug 2025" />
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link href="/rapport" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            Les full rapport
          </Link>
          <a
            href="/reports/lipedema-rapport.docx"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Last ned DOCX
          </a>
        </div>
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-2 rounded-2xl" role="tablist" aria-label="Dashboardseksjoner">
          <TabButton id="overview" label="Klinisk oversikt" active={activeTab === 'overview'} />
          <TabButton id="health" label="Helsestatus (RAND-12)" active={activeTab === 'health'} />
          <TabButton id="symptoms" label="Symptombelastning" active={activeTab === 'symptoms'} />
          <TabButton id="employment" label="Arbeidsdeltakelse" active={activeTab === 'employment'} />
        </div>
        {activeTab === 'overview' && (
          <div className="space-y-6" id={getPanelId('overview')} role="tabpanel" aria-labelledby={getTabId('overview')}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Behandlingskategorier</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={treatmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ percent }) => `${formatPercent(percent * 100, 1)}%`}>
                      {treatmentData.map((entry, index) => (<Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {treatmentData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Komposittskårer for helse</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={compositeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consultation" name="Konsultasjon alene" fill={CHART_COLORS.consultation} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="operated" name="Kirurgisk behandlet" fill={CHART_COLORS.operated} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                  <p className="text-green-800 text-sm"><strong>Klinisk forbedring:</strong> Kirurgisk behandlede pasienter scorer i snitt {formatDecimal(averageCompositeDiff, 0)}+ poeng høyere</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Kliniske hovedfunn</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                  <p className="text-3xl font-bold">+{formatDecimal(physicalDiff)}</p>
                  <p className="text-indigo-100 text-sm">Høyere fysisk helseskår hos kirurgisk behandlede</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                  <p className="text-3xl font-bold">+{formatDecimal(mentalDiff)}</p>
                  <p className="text-indigo-100 text-sm">Høyere mental helseskår hos kirurgisk behandlede</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                  <p className="text-3xl font-bold">-{formatPercent(avgSymptomReduction)}%</p>
                  <p className="text-indigo-100 text-sm">Lavere symptombelastning hos kirurgisk behandlede</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'health' && (
          <div className="space-y-6" id={getPanelId('health')} role="tabpanel" aria-labelledby={getTabId('health')}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">RAND-12 domeneskårer</h3>
              <p className="text-gray-500 text-sm mb-4">Skala 0–100, høyere = bedre helse</p>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rand12Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="domain" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultation" name="Konsultasjon alene" fill={CHART_COLORS.consultation} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="operated" name="Kirurgisk behandlet" fill={CHART_COLORS.operated} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Helseprofil – radardiagram</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={rand12Data}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="fullName" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Konsultasjon alene" dataKey="consultation" stroke={CHART_COLORS.consultation} fill={CHART_COLORS.consultation} fillOpacity={0.3} />
                  <Radar name="Kirurgisk behandlet" dataKey="operated" stroke={CHART_COLORS.operated} fill={CHART_COLORS.operated} fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rand12Data.map((item) => (
                <div key={item.domain} className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-indigo-500">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{item.domain}</p>
                  <p className="font-semibold text-gray-800">{item.fullName}</p>
                  <div className="mt-2 flex justify-between items-end">
                    <div><p className="text-red-500 text-sm">{formatDecimal(item.consultation)}</p><p className="text-xs text-gray-400">Kons.</p></div>
                    <div className="text-center"><p className="text-green-600 font-bold">+{formatDecimal(delta(item.consultation, item.operated))}</p></div>
                    <div className="text-right"><p className="text-green-500 text-sm">{formatDecimal(item.operated)}</p><p className="text-xs text-gray-400">Op.</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'symptoms' && (
          <div className="space-y-6" id={getPanelId('symptoms')} role="tabpanel" aria-labelledby={getTabId('symptoms')}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Lipedema-spesifikke symptomer</h3>
              <p className="text-gray-500 text-sm mb-4">Skala 0–4 (aldri–alltid), lavere = bedre</p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={symptomData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 4]} />
                  <YAxis dataKey="symptom" type="category" width={160} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultation" name="Konsultasjon alene" fill={CHART_COLORS.consultation} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="operated" name="Kirurgisk behandlet" fill={CHART_COLORS.operated} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {symptomData.map((item) => (
                <div key={item.symptom} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">-{formatPercent(reductionPercent(item.consultation, item.operated))}%</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">{item.symptom}</h4>
                  <p className="text-gray-500 text-sm mt-1">{formatDecimal(item.consultation, 2)} til {formatDecimal(item.operated, 2)}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Samlet symptombyrde</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center"><p className="text-4xl font-bold">{formatDecimal(avgSymptomConsultation, 2)}</p><p className="text-emerald-100">Konsultasjon alene</p></div>
                <div className="flex items-center justify-center"><div className="bg-white/20 rounded-full px-6 py-2"><span className="text-2xl font-bold">til</span></div></div>
                <div className="text-center"><p className="text-4xl font-bold">{formatDecimal(avgSymptomOperated, 2)}</p><p className="text-emerald-100">Kirurgisk behandlet</p></div>
              </div>
              <p className="text-center mt-4 text-emerald-100">p = 1.8e-8 (statistisk signifikant)</p>
            </div>
          </div>
        )}
        {activeTab === 'employment' && (
          <div className="space-y-6" id={getPanelId('employment')} role="tabpanel" aria-labelledby={getTabId('employment')}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Arbeidsdeltakelse etter behandlingsgruppe</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={employmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="status" />
                  <YAxis domain={[0, 60]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultation" name="Konsultasjon alene" fill={CHART_COLORS.consultation} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="operated" name="Kirurgisk behandlet" fill={CHART_COLORS.operated} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Positive trender hos kirurgisk behandlede</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl"><span className="text-gray-700">Heltidsarbeid</span><div className="flex items-center gap-2"><span className="text-gray-500">40.9%</span><span className="font-bold text-green-600">55.9%</span></div></div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl"><span className="text-gray-700">Sykmelding</span><div className="flex items-center gap-2"><span className="text-gray-500">15.1%</span><span className="font-bold text-green-600">8.8%</span></div></div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl"><span className="text-gray-700">Uføretrygd</span><div className="flex items-center gap-2"><span className="text-gray-500">22.6%</span><span className="font-bold text-green-600">16.2%</span></div></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-4">Nøkkeltall arbeidsdeltakelse</h4>
                <div className="space-y-4">
                  <div><p className="text-4xl font-bold">+{formatPercent(fullTimeIncrease)}%</p><p className="text-blue-100">Økning i heltidsarbeid blant kirurgisk behandlede</p></div>
                  <div><p className="text-4xl font-bold">-{formatPercent(sickLeaveReduction)}%</p><p className="text-blue-100">Reduksjon i sykefravær blant kirurgisk behandlede</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Data fra anonym tverrsnittsundersøkelse ved IbsenSykehusene</p>
          <p className="mt-1">N = 202 respondenter | 28% svarprosent | Aug 2021–Aug 2025</p>
        </div>
      </div>
    </div>
  );
}
