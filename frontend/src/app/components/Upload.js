import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap-trial';
import { Upload as UploadIcon, FileSpreadsheet, AlertCircle } from 'lucide-react';

export default function Upload({ onComplete }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const containerRef = useRef(null);
    const dropzoneRef = useRef(null);
    const progressRef = useRef(null);
    const checkmarkRef = useRef(null);

    useEffect(() => {
        // Initial animations
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current.querySelectorAll('.fade-in'), {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });

            gsap.set(dropzoneRef.current, {
                borderImage: 'linear-gradient(45deg, #a69eff, #dfdcff) 1',
                scale: 1,
            });
        });

        return () => ctx.revert();
    }, []);

    const animateDropzone = (dragging) => {
        gsap.to(dropzoneRef.current, {
            scale: dragging ? 1.02 : 1,
            boxShadow: dragging ? '0 8px 30px rgba(0,0,0,0.12)' : '0 4px 6px rgba(0,0,0,0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    // ... (keep your existing event handlers)
    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isDragging) {
            setIsDragging(true);
            animateDropzone(true);
        }
    };

    const handleDragLeave = () => {
        setIsDragging(false);
        animateDropzone(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        animateDropzone(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setIsUploading(true);

        gsap.timeline()
            .to(progressRef.current, {
                width: '100%',
                duration: 2,
                ease: 'power1.inOut'
            })
            .to(progressRef.current, {
                opacity: 0,
                duration: 0.3
            })
            .fromTo(
                checkmarkRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        setIsUploading(false);
                        setUploadComplete(true);
                        setTimeout(onComplete, 800);
                    }
                }
            );
    };

    return (
        <div ref={containerRef} className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 fade-in">
                <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Upload Genomic Data
                </h2>
                <p className="text-gray-600 mb-4">
                    Start your journey towards more equitable genetic insights by uploading your genomic data file.
                </p>
            </div>

            {/* File Upload Section */}
            <div className="space-y-6">
                {/* Accepted Files Info */}
                <div className="bg-blue-50 p-4 rounded-lg fade-in">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Accepted File Types
                    </h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• CSV files with genomic variant data</li>
                        <li>• Excel spreadsheets (.xlsx) with demographic information</li>
                        <li>• Standard genetic data exports (.txt, .vcf)</li>
                    </ul>
                </div>

                {/* Upload Zone */}
                <div
                    ref={dropzoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="p-8 rounded-xl bg-white transition-all duration-300 relative border-4 border-dashed"
                    style={{
                        borderImage: 'linear-gradient(45deg, #4F46E5, #818CF8) 30',
                        borderImageSlice: '1'
                    }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6 relative">
                        <div className="text-center">
                            <UploadIcon className="mx-auto h-12 w-12 text-indigo-600"/>
                            <div className="mt-6">
                                <label className="block text-xl font-semibold text-gray-900">
                                    {file ? file.name : 'Drop your genomic data file here'}
                                </label>
                                <p className="mt-2 text-base text-gray-600">
                                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'or select a file from your computer'}
                                </p>
                                <div className="mt-6">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        id="file-upload"
                                        accept=".csv,.xlsx,.txt,.vcf"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                                    >
                                        Browse Files
                                    </label>
                                </div>
                            </div>
                        </div>

                        {file && !isUploading && !uploadComplete && (
                            <button
                                type="submit"
                                className="w-full py-4 px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-lg font-medium"
                            >
                                Analyze Genomic Data
                            </button>
                        )}

                        {isUploading && (
                            <div className="relative pt-1">
                                <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                                    <div
                                        ref={progressRef}
                                        className="h-full w-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2 text-center">Processing your data...</p>
                            </div>
                        )}

                        {uploadComplete && (
                            <div className="flex flex-col items-center">
                                <div ref={checkmarkRef}
                                     className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-3 text-green-600 font-medium">Upload Complete!</p>
                                <p className="text-sm text-gray-500">Preparing your analysis...</p>
                            </div>
                        )}
                    </form>
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 p-4 rounded-lg fade-in">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-gray-600 mr-3 mt-0.5"/>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">Privacy & Data Usage</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Your genetic data is analyzed securely and privately. We only use your data to provide personalized insights and identify potential biases in genetic predictions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}