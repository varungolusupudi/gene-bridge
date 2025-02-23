import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, Activity, Users, FileSpreadsheet, Database, Share2, Brain, Globe2 } from 'lucide-react';

// Sample data for when upload is complete
const accuracyData = [
    { group: 'European Ancestry', accuracy: 85, samples: 12000 },
    { group: 'African Ancestry', accuracy: 77, samples: 3000 },
    { group: 'Asian Ancestry', accuracy: 79, samples: 4500 },
    { group: 'Hispanic Ancestry', accuracy: 75, samples: 2800 }
];

const timelineData = [
    { month: 'Jan', accuracy: 72 },
    { month: 'Feb', accuracy: 75 },
    { month: 'Mar', accuracy: 78 },
    { month: 'Apr', accuracy: 77 },
    { month: 'May', accuracy: 80 },
    { month: 'Jun', accuracy: 82 }
];

const COLORS = ['#6366f1', '#60a5fa', '#34d399', '#fbbf24'];

export default function AnalysisDashboard({ isDark, hasUploaded = false }) {
    const [activeTab, setActiveTab] = useState('overview');

    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const subTextColor = isDark ? 'text-gray-300' : 'text-gray-600';
    const cardBg = isDark ? 'bg-gray-800/50' : 'bg-white';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
    const tabBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
    const activeTabBg = isDark ? 'bg-indigo-600' : 'bg-indigo-500';

    const UploadOverlay = () => (
        <div className="absolute inset-0 backdrop-blur-md z-50 flex items-center justify-center">
            <div className={`text-center max-w-lg mx-auto p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border-2 border-dashed ${borderColor}`}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <Database className={`w-10 h-10 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>
                    Upload Required
                </h3>
                <p className={`${subTextColor} mb-6`}>
                    Please upload your genetic data file to view the comprehensive analysis dashboard with personalized insights and fairness metrics.
                </p>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Upload Genomic Data
                </button>
            </div>
        </div>
    );

    const TabButton = ({ name, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === name
                    ? `${activeTabBg} text-white`
                    : `${tabBg} ${subTextColor} hover:bg-opacity-80`
            }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <section className="analysis-section min-h-screen relative py-20">
            {!hasUploaded && <UploadOverlay />}

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h2 className={`text-3xl font-bold mb-2 ${textColor}`}>
                        GeneBridge Analysis Dashboard
                    </h2>
                    <p className={subTextColor}>
                        Comprehensive analysis of your genetic data with equity-focused insights and risk assessments
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <TabButton name="overview" icon={Activity} label="Overview" />
                    <TabButton name="fairness" icon={Users} label="Fairness Metrics" />
                    <TabButton name="risks" icon={AlertCircle} label="Risk Analysis" />
                    <TabButton name="global" icon={Globe2} label="Global Context" />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: Users, label: 'Demographic Match', value: '77%', subtext: 'representation in database' },
                        { icon: Activity, label: 'Analysis Confidence', value: '85%', subtext: 'overall prediction accuracy' },
                        { icon: Share2, label: 'Data Points Analyzed', value: '2.4M', subtext: 'genetic variants' },
                        { icon: Brain, label: 'AI Model Version', value: 'v2.1', subtext: 'last updated 2 days ago' }
                    ].map((stat, idx) => (
                        <div key={idx} className={`${cardBg} rounded-xl p-6 border ${borderColor}`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <stat.icon className={`w-8 h-8 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    <h3 className={`text-2xl font-bold mt-4 ${textColor}`}>{stat.value}</h3>
                                    <p className={`${subTextColor} text-sm mt-1`}>{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Model Fairness Analysis */}
                    <div className={`${cardBg} rounded-xl p-6 border ${borderColor}`}>
                        <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${textColor}`}>
                            <Users className="w-5 h-5" />
                            Model Fairness Analysis
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="group" angle={-45} textAnchor="end" height={80} />
                                    <YAxis />
                                    <Tooltip
                                        content={({ payload, label }) => {
                                            if (!payload?.length) return null;
                                            return (
                                                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg shadow-lg border ${borderColor}`}>
                                                    <p className={textColor}>{label}</p>
                                                    <p className={`${textColor} font-semibold`}>
                                                        Accuracy: {payload[0].value}%
                                                    </p>
                                                    <p className={subTextColor}>
                                                        Samples: {accuracyData.find(d => d.group === label).samples.toLocaleString()}
                                                    </p>
                                                </div>
                                            );
                                        }}
                                    />
                                    <Bar dataKey="accuracy" fill="#6366f1" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Model Improvement Timeline */}
                    <div className={`${cardBg} rounded-xl p-6 border ${borderColor}`}>
                        <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${textColor}`}>
                            <Activity className="w-5 h-5" />
                            Model Improvement Timeline
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[70, 90]} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className={`${cardBg} rounded-xl p-6 border ${borderColor}`}>
                        <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textColor}`}>
                            <AlertCircle className="w-5 h-5" />
                            Personalized Insights & Actions
                        </h3>
                        <div className="space-y-4">
                            <div className={`p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20`}>
                                <h4 className="text-yellow-500 font-medium mb-2">Representation Alert</h4>
                                <p className={subTextColor}>
                                    Your demographic group has lower representation in our training data. We've adjusted our confidence scores accordingly and recommend additional verification steps.
                                </p>
                            </div>
                            <div className={`p-4 rounded-lg ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'} border ${isDark ? 'border-indigo-500/20' : 'border-indigo-100'}`}>
                                <h4 className={`${textColor} font-medium mb-2`}>Recommended Actions</h4>
                                <ul className={`${subTextColor} space-y-2`}>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1">•</span>
                                        Schedule a consultation with a genetic counselor specialized in diverse populations
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1">•</span>
                                        Consider participating in the GeneBridge research initiative to improve model accuracy
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1">•</span>
                                        Set up quarterly monitoring for high-risk conditions with your healthcare provider
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Population Distribution */}
                    <div className={`${cardBg} rounded-xl p-6 border ${borderColor}`}>
                        <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textColor}`}>
                            <Globe2 className="w-5 h-5" />
                            Population Distribution
                        </h3>
                        <div className="h-80 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={accuracyData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="samples"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {accuracyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}