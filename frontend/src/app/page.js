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
import AdditionalSections from "@/app/components/AdditionalSections";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function Home() {
    const [isDark, setIsDark] = useState(true);
    const [hasUploaded, setHasUploaded] = useState(false);
    const smoothWrapperRef = useRef(null);
    const smoothContentRef = useRef(null);

    useEffect(() => {
        // Initialize global smooth scrolling
        const smoother = ScrollSmoother.create({
            wrapper: smoothWrapperRef.current,
            content: smoothContentRef.current,
            smooth: 1,
            effects: true
        });

        // Global animations (Upload fade-in, Analysis blur, etc.)
        const ctx = gsap.context(() => {
            // Animate the Upload section to fade in
            gsap.from(".upload-section", {
                scrollTrigger: {
                    trigger: ".upload-section",
                    start: "top center",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1
            });

            // If not uploaded, blur the Analysis section
            if (!hasUploaded) {
                const blurTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".analysis-section",
                        start: "top center",
                        toggleActions: "play none none reverse"
                    }
                });
                blurTl.to(".analysis-blur", {
                    backdropFilter: "blur(10px)",
                    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)",
                    duration: 0.5
                });
            }
        });

        return () => {
            smoother.kill();
            ctx.revert();
        };
    }, [isDark, hasUploaded]);

    return (
        <div ref={smoothWrapperRef} className="smooth-wrapper">
            <div ref={smoothContentRef} className="smooth-content">
                <main className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'} transition-colors duration-700`}>
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="fixed top-8 right-8 z-50 p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300"
                    >
                        <span className="block w-6 h-6">{isDark ? '🌙' : '☀️'}</span>
                    </button>

                    {/* Hero Section */}
                    <section className="hero-section">
                        <Hero
                            isDark={isDark}
                            onGetStarted={() => {
                                ScrollSmoother.get().scrollTo(".process-section", true);
                            }}
                        />
                    </section>

                    {/* Process Section */}
                    <section className="process-section">
                        <Process isDark={isDark} />
                    </section>

                    {/* Upload Section */}
                    <section className="upload-section min-h-screen py-20">
                        <div className="container mx-auto px-4 max-w-4xl" data-speed="0.9">
                            <div className={`rounded-2xl p-12 backdrop-blur-sm ${isDark ? 'bg-white/5' : 'bg-white/80'}`}>
                                <Upload
                                    isDark={isDark}
                                    onComplete={() => {
                                        setHasUploaded(true);
                                        ScrollSmoother.get().scrollTo(".analysis-section", true);
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Analysis Section */}
                    <AnalysisDashboard isDark={isDark} hasUploaded={hasUploaded} />

                    <AdditionalSections isDark={isDark} />

                </main>
            </div>
        </div>
    );
}