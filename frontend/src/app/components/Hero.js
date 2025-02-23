'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap-trial';
import ScrambleText from 'gsap-trial/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleText);

const circlePositions = [
    { left: '10%', top: '20%' },
    { left: '70%', top: '30%' },
    { left: '30%', top: '60%' },
    { left: '80%', top: '80%' },
    { left: '20%', top: '80%' },
];

const linePositions = [
    { left: 0, top: '35%' },
    { left: 0, top: '55%' },
    { left: 0, top: '75%' },
];

const Hero = ({ isDark, onGetStarted }) => {
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Set initial states
        gsap.set(titleRef.current, { opacity: 0 });
        gsap.set('.decorative-circle', { scale: 0, opacity: 0 });
        gsap.set('.decorative-line', { scaleX: 0, opacity: 0 });
        gsap.set('.cta-button', { y: 20, opacity: 0 });
        gsap.set(scrollIndicatorRef.current, { y: -20, opacity: 0 });

        // Main animation timeline
        tl.from(mainRef.current, {
            opacity: 0,
            duration: 1,
        })
            .to(titleRef.current, {
                duration: 4,
                opacity: 1,
                scrambleText: {
                    text: 'Gene Bridge',
                    chars: 'upperCase',
                    revealDelay: 1,
                    tweenLength: true,
                    speed: 0.2,
                },
            })
            .from(
                subtitleRef.current,
                {
                    opacity: 0,
                    y: 20,
                    filter: 'blur(10px)',
                    duration: 1,
                },
                '-=3'
            )
            .to(
                '.decorative-circle',
                {
                    scale: 1,
                    opacity: 0.5,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'elastic.out(1, 0.3)',
                },
                '-=2'
            )
            .to(
                '.decorative-line',
                {
                    scaleX: 1,
                    opacity: 0.2,
                    duration: 1,
                    stagger: 0.1,
                },
                '-=1.5'
            )
            .to(
                '.cta-button',
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.7)',
                },
                '-=1'
            )
            .to(
                scrollIndicatorRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                },
                '-=0.5'
            );

        // Floating animations for circles
        gsap.to('.decorative-circle', {
            y: 'random(-20, 20)',
            x: 'random(-20, 20)',
            duration: 'random(3, 5)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
                amount: 2,
                from: 'random',
            },
        });

        // Continuous scroll indicator animation
        gsap.to(scrollIndicatorRef.current, {
            y: '+=10',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });
    }, []);

    return (
        <section
            ref={mainRef}
            className={`relative min-h-screen ${
                isDark ? 'bg-black' : 'bg-gray-50'
            } transition-colors duration-700 flex items-center justify-center overflow-hidden`}
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {circlePositions.map((pos, i) => (
                    <div
                        key={i}
                        className="decorative-circle absolute w-32 h-32 rounded-full bg-purple-500/30"
                        style={{
                            left: pos.left,
                            top: pos.top,
                        }}
                    />
                ))}
                {linePositions.map((pos, i) => (
                    <div
                        key={i}
                        className="decorative-line absolute h-px bg-purple-500/20"
                        style={{
                            left: pos.left,
                            top: pos.top,
                            width: '100%',
                            transform: 'rotate(-5deg)',
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                <h1
                    ref={titleRef}
                    className="hero-title text-8xl font-bold mb-8"
                    style={{
                        WebkitTextFillColor: 'transparent',
                        background:
                            'linear-gradient(129.03deg, #d2ceff 10%, #dfdcff 27%, #a69eff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        display: 'inline-block',
                        lineHeight: 1.2,
                    }}
                >
                    GeneBridge
                </h1>

                <p
                    ref={subtitleRef}
                    className={`text-xl max-w-3xl mx-auto leading-relaxed mb-12 ${
                        isDark ? 'text-purple-200/90' : 'text-gray-700'
                    }`}
                >
                    <span className="font-semibold text-2xl block mb-4">
                        Revolutionizing Genomic Analysis
                    </span>
                    Empowering healthcare through AI-driven insights, making genomic data
                    more accessible and equitable for diverse populations worldwide.
                </p>

                {/* CTA Buttons */}
                <div className="space-x-6">
                    <button
                        onClick={onGetStarted}
                        className={`cta-button px-8 py-4 text-lg rounded-lg transition-colors duration-300 shadow-lg ${
                            isDark
                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                                : 'bg-purple-300 hover:bg-purple-400 text-white shadow-purple-300/20'
                        }`}
                    >
                        Get Started
                    </button>
                    <button
                        className={`cta-button px-8 py-4 text-lg rounded-lg transition-colors duration-300 border-2 shadow-lg ${
                            isDark
                                ? 'border-purple-500 text-purple-300 hover:bg-purple-500/10'
                                : 'border-purple-300 text-purple-400 hover:bg-purple-100'
                        }`}
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 right-8 flex flex-col items-center"
            >
                <span
                    className={`text-sm mb-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    Scroll
                </span>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={isDark ? 'text-purple-400' : 'text-purple-600'}
                >
                    <path
                        d="M12 4L12 20M12 20L18 14M12 20L6 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;