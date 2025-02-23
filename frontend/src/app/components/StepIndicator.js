// src/app/components/StepIndicator.js
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap-trial'

export default function StepIndicator({ currentStep, steps }) {
    const indicatorRef = useRef(null)

    useEffect(() => {
        // Animate the current step
        gsap.to(`[data-step="${currentStep}"]`, {
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.7)',
        })

        // Animate the progress line
        gsap.to('.progress-line', {
            scaleX: (currentStep - 1) / (steps.length - 1),
            duration: 0.5,
            ease: 'power2.out'
        })
    }, [currentStep])

    return (
        <div ref={indicatorRef} className="max-w-4xl mx-auto px-4">
            <div className="relative flex items-center justify-between mb-12">
                {/* Progress line background */}
                <div className="absolute h-1 w-full bg-gray-200 top-5"/>

                {/* Animated progress line */}
                <div className="progress-line absolute h-1 w-full bg-blue-500 top-5 origin-left scale-x-0"/>

                {steps.map((step, index) => (
                    <div
                        key={index}
                        data-step={index + 1}
                        className="flex flex-col items-center relative z-10"
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                            transition-colors duration-300
                            ${index < currentStep ? 'bg-blue-500 text-white' :
                            index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {index + 1}
                        </div>
                        <span className={`mt-2 text-sm transition-colors duration-300
                            ${index === currentStep ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                            {step}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}