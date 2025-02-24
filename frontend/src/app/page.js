'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap-trial';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
import ScrollSmoother from 'gsap-trial/ScrollSmoother';
import { SplitText } from 'gsap-trial/SplitText';
import Hero from './components/Hero';
import Process from './components/Process';
import Upload from './components/Upload';
import AnalysisDashboard from "@/app/components/AnalysisDashboard";
import AnalysisDashboardLung from "@/app/components/AnalysisDashboardLung";
import AdditionalSections from "@/app/components/AdditionalSections";
import { UploadIcon } from 'lucide-react';  // Use UploadIcon instead of Database

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function Home() {
    const [isDark, setIsDark] = useState(true);
    const [hasUploaded, setHasUploaded] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);  // Breast cancer
    const [analysisDataLung, setAnalysisDataLung] = useState(null);  // Lung cancer
    const smoothWrapperRef = useRef(null);
    const smoothContentRef = useRef(null);
    const dashboardRef = useRef(null);

    const handleUploadComplete = (data, isLungCancer) => {
        // Reset previous data
        if (isLungCancer) {
            setAnalysisData(null);  // Clear breast data
            setAnalysisDataLung(data);
        } else {
            setAnalysisDataLung(null);  // Clear lung data
            setAnalysisData(data);
        }
        setHasUploaded(true);
        setTimeout(() => {
            ScrollSmoother.get().scrollTo(dashboardRef.current, true, "top top");
        }, 100);
    };

    useEffect(() => {
        const smoother = ScrollSmoother.create({
            wrapper: smoothWrapperRef.current,
            content: smoothContentRef.current,
            smooth: 1,
            effects: true
        });

        const ctx = gsap.context(() => {
            gsap.from(".upload-section", {
                scrollTrigger: { trigger: ".upload-section", start: "top center", toggleActions: "play none none reverse" },
                y: 100,
                opacity: 0,
                duration: 1
            });
        });

        return () => {
            smoother.kill();
            ctx.revert();
        };
    }, [isDark, hasUploaded]);

    const UploadOverlay = () => (
        <div className="absolute inset-0 backdrop-blur-md z-50 flex items-center justify-center">
            <div className={`text-center max-w-lg mx-auto p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <UploadIcon className={`w-10 h-10 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} /> 
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upload Required</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Please upload your genetic data file to view the analysis.</p>
            </div>
        </div>
    );

    return (
        <div ref={smoothWrapperRef} className="smooth-wrapper">
            <div ref={smoothContentRef} className="smooth-content">
                <main className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'} transition-colors duration-700`}>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="fixed top-8 right-8 z-50 p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300"
                    >
                        <span className="block w-6 h-6">{isDark ? '🌙' : '☀️'}</span>
                    </button>

                    <section className="hero-section">
                        <Hero isDark={isDark} onGetStarted={() => ScrollSmoother.get().scrollTo(".process-section", true)} />
                    </section>

                    <section className="process-section">
                        <Process isDark={isDark} />
                    </section>

                    <section className="upload-section min-h-screen py-20">
                        <div className="container mx-auto px-4 max-w-4xl" data-speed="0.9">
                            <div className={`rounded-2xl p-12 backdrop-blur-sm ${isDark ? 'bg-white/5' : 'bg-white/80'}`}>
                                <Upload onComplete={handleUploadComplete} />
                            </div>
                        </div>
                    </section>

                    <section ref={dashboardRef} className="analysis-section min-h-screen relative py-20">
                        {!hasUploaded && <UploadOverlay />}
                        {analysisData && <AnalysisDashboard data={analysisData} hasUploaded={hasUploaded} isDark={isDark} />}
                        {analysisDataLung && <AnalysisDashboardLung data={analysisDataLung} hasUploaded={hasUploaded} isDark={isDark} />}
                    </section>

                    <AdditionalSections isDark={isDark} />
                </main>
            </div>
        </div>
    );
}