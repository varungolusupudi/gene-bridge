import React, { useEffect, useRef } from 'react';
import gsap from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { SplitText } from 'gsap-trial/SplitText';
import { BarChart2, Upload, Brain, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Process = ({ isDark }) => {
    const containerRef = useRef(null);
    const backgroundRef = useRef(null);
    const headingRef = useRef(null);

    const steps = [
        {
            icon: '🧬',
            title: 'Data Collection',
            description: 'Upload your genomic data or select from our diverse demographic profiles to begin your journey with GeneBridge.',
            UIElement: () => (
                <div className="relative">
                    <Upload className="w-12 h-12 text-blue-500 absolute -top-16 -right-20 opacity-50" />
                    <div className="w-32 h-8 bg-blue-100 rounded-lg absolute -bottom-16 -left-20 opacity-30" />
                </div>
            )
        },
        {
            icon: '🤖',
            title: 'AI Analysis',
            description: 'Our advanced ML models analyze your data, calculating risk scores while considering genetic variations across different populations.',
            UIElement: () => (
                <div className="relative">
                    <Brain className="w-12 h-12 text-purple-500 absolute -top-16 -left-20 opacity-50" />
                    <div className="w-32 h-8 bg-purple-100 rounded-lg absolute -bottom-16 -right-20 opacity-30" />
                </div>
            )
        },
        {
            icon: '⚖️',
            title: 'Fairness Check',
            description: 'GeneBridge evaluates potential biases, ensuring transparency about model confidence levels for your specific demographic.',
            UIElement: () => (
                <div className="relative">
                    <BarChart2 className="w-12 h-12 text-green-500 absolute -top-16 -right-20 opacity-50" />
                    <div className="w-32 h-8 bg-green-100 rounded-lg absolute -bottom-16 -left-20 opacity-30" />
                </div>
            )
        },
        {
            icon: '🔍',
            title: 'Insights & Action',
            description: 'Receive personalized recommendations and next steps for more accurate genetic insights, promoting health equity.',
            UIElement: () => (
                <div className="relative">
                    <LineChart className="w-12 h-12 text-orange-500 absolute -top-16 -left-20 opacity-50" />
                    <div className="w-32 h-8 bg-orange-100 rounded-lg absolute -bottom-16 -right-20 opacity-30" />
                </div>
            )
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        const background = backgroundRef.current;
        const heading = headingRef.current;

        const ctx = gsap.context(() => {
            // Animate heading
            gsap.from(heading, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });

            // Rotate the background pattern
            gsap.to(background, {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: '+=400%',
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            const stepElements = container.querySelectorAll('.step');
            gsap.set(stepElements, { opacity: 0, scale: 0.5 });

            stepElements.forEach((step, index) => {
                const stepStart = index * 1;
                const icon = step.querySelector('.step-icon');
                const title = step.querySelector('.step-title');
                const description = step.querySelector('.step-description');
                const uiElement = step.querySelector('.ui-element');

                timeline
                    .to(step, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    }, stepStart)
                    .from(icon, {
                        scale: 0,
                        rotate: -180,
                        duration: 0.5,
                        ease: "back.out(2)"
                    }, stepStart + 0.2)
                    .from(
                        title.querySelectorAll('.char'),
                        {
                            opacity: 0,
                            y: 50,
                            rotateX: -90,
                            stagger: 0.03,
                            duration: 0.5,
                            ease: "back.out(1.7)"
                        },
                        stepStart + 0.3
                    )
                    .from(description, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5
                    }, stepStart + 0.5)
                    .from(uiElement, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)"
                    }, stepStart + 0.6)
                    .to({}, { duration: 0.5 })
                    .to(step, {
                        opacity: 0,
                        scale: 0.8,
                        y: -50,
                        duration: 0.5,
                        ease: "power2.in"
                    }, stepStart + 1.5);
            });
        }, container);

        return () => ctx.revert();
    }, [isDark]);

    return (
        <section
            ref={containerRef}
            className="h-screen w-full relative overflow-hidden"
            style={{
                backgroundColor: isDark ? '#000' : '#fff',
                color: isDark ? '#fff' : '#000',
            }}
        >
            {/* Background Pattern */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 opacity-5"
                style={{
                    background: `radial-gradient(circle at center, ${isDark ? '#fff' : '#000'} 1px, transparent 1px) 0 0/40px 40px`,
                }}
            />

            {/* Heading */}
            <div
                ref={headingRef}
                className="absolute top-10 right-10 text-right z-20"
            >
                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    GeneBridge Journey
                </h1>
                <p className="text-sm opacity-70">
                    Bridging the Gap in Genomic Equity
                </p>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="step absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
                    >
                        <div className="step-content text-center">
                            <div className="relative">
                                <div className="step-icon text-7xl mb-8 transform-gpu">
                                    {step.icon}
                                </div>
                                <div className="ui-element">
                                    <step.UIElement />
                                </div>
                            </div>
                            <h2 className="step-title text-5xl font-bold mb-6">
                                {step.title.split('').map((char, i) => (
                                    <span key={i} className="char inline-block">
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                ))}
                            </h2>
                            <p className="step-description text-xl leading-relaxed max-w-xl mx-auto opacity-80">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;