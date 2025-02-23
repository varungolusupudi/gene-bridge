import React from 'react';
import { BookOpen, Users, Globe2, ChevronRight, HeartHandshake, Share2, FilePlus2, GraduationCap } from 'lucide-react';

export default function AdditionalSections({ isDark }) {
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const subTextColor = isDark ? 'text-gray-300' : 'text-gray-600';
    const cardBg = isDark ? 'bg-gray-800/50' : 'bg-white';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

    return (
        <>
            {/* Research Participation Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>
                            Join the Movement for Equitable Genetics
                        </h2>
                        <p className={`${subTextColor} max-w-2xl mx-auto`}>
                            Help us build a more inclusive future of genetic research by participating in our initiatives
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: 'Data Contribution',
                                description: 'Share your anonymized genetic data to improve model accuracy for underrepresented groups',
                                action: 'Learn About Data Sharing'
                            },
                            {
                                icon: HeartHandshake,
                                title: 'Research Studies',
                                description: 'Participate in ongoing studies focused on diverse population genetics',
                                action: 'Find Studies'
                            },
                            {
                                icon: Share2,
                                title: 'Community Advocacy',
                                description: 'Join our community of advocates pushing for more inclusive genetic research',
                                action: 'Join Community'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`${cardBg} rounded-xl p-8 border ${borderColor} hover:shadow-lg transition-all`}>
                                <div className="mb-6">
                                    <item.icon className={`w-12 h-12 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                </div>
                                <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>{item.title}</h3>
                                <p className={`${subTextColor} mb-6`}>{item.description}</p>
                                <button className="flex items-center text-indigo-500 hover:text-indigo-600 font-medium">
                                    {item.action}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Educational Resources */}
            <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>
                            Understanding Your Results
                        </h2>
                        <p className={`${subTextColor} max-w-2xl mx-auto`}>
                            Access our comprehensive educational resources to better understand your genetic analysis
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: BookOpen,
                                title: 'Genetic Basics',
                                description: 'Learn the fundamentals of genetic analysis and interpretation'
                            },
                            {
                                icon: GraduationCap,
                                title: 'Understanding Bias',
                                description: 'Explore how genetic bias affects research and predictions'
                            },
                            {
                                icon: FilePlus2,
                                title: 'Reading Reports',
                                description: 'Guide to understanding your GeneBridge analysis reports'
                            },
                            {
                                icon: Globe2,
                                title: 'Global Context',
                                description: 'Understanding genetics across different populations'
                            }
                        ].map((resource, idx) => (
                            <div key={idx} className={`${cardBg} rounded-xl p-6 border ${borderColor} hover:shadow-lg transition-all`}>
                                <resource.icon className={`w-8 h-8 mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>{resource.title}</h3>
                                <p className={`${subTextColor} text-sm`}>{resource.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className={`${cardBg} rounded-2xl border ${borderColor} p-12 text-center`}>
                        <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>
                            Ready to Make a Difference?
                        </h2>
                        <p className={`${subTextColor} max-w-2xl mx-auto mb-8`}>
                            Join thousands of others in building a more equitable future for genetic research and healthcare
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                Share Your Data
                            </button>
                            <button className={`px-8 py-3 border ${borderColor} rounded-lg hover:bg-opacity-50 transition-colors ${textColor}`}>
                                Learn More
                            </button>
                        </div>
                        <p className={`mt-6 text-sm ${subTextColor}`}>
                            Your data is always secure and anonymized. View our privacy policy for more information.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}