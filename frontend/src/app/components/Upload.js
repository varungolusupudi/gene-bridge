import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap-trial';
import { Upload as UploadIcon, FileSpreadsheet, AlertCircle, Loader2 } from 'lucide-react';
import { API_URL } from '../config';

export default function Upload({ onComplete }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState('');
    const [error, setError] = useState(null);

    const containerRef = useRef(null);
    const dropzoneRef = useRef(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current.querySelectorAll('.fade-in'), {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
            gsap.set(dropzoneRef.current, { scale: 1 });
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

    const animateLoader = () => {
        gsap.fromTo(loaderRef.current,
            { rotate: 0 },
            { rotate: 360, duration: 1, repeat: -1, ease: 'linear' }
        );
    };

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
            setError(null); // Reset error on new file
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsProcessing(true);
        setProcessStep('Preprocessing Data');
        setError(null);
        animateLoader();

        const formData = new FormData();
        formData.append('file', file);

        const isLungCancer = file.name.toLowerCase().includes("lung") || file.name.toLowerCase().includes("luad");
        const endpoint = isLungCancer ? "http://localhost:8001/lung/analyze" : `${API_URL}/analyze`;

        try {
            setTimeout(() => setProcessStep('Analyzing with AI'), 1000);
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            onComplete(data, isLungCancer);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError(`Upload failed: ${error.message}`);
        } finally {
            setIsProcessing(false);
            setProcessStep('');
        }
    };

    return (
        <div ref={containerRef} className="max-w-2xl mx-auto">
            <div className="mb-8 fade-in">
                <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Upload Genomic Data
                </h2>
                <p className="text-gray-600 mb-4">
                    Start your journey towards equitable genetic insights.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg fade-in">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Accepted File Types
                    </h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• CSV files with genomic variant data</li>
                        <li>• Excel spreadsheets (.xlsx)</li>
                        <li>• Standard genetic data exports (.txt, .vcf)</li>
                    </ul>
                </div>

                <div
                    ref={dropzoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="p-8 rounded-xl bg-white transition-all duration-300 relative border-4 border-dashed"
                    style={{ borderImage: 'linear-gradient(45deg, #4F46E5, #818CF8) 30', borderImageSlice: '1' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6 relative">
                        {!isProcessing ? (
                            <div className="text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-indigo-600" />
                                <div className="mt-6">
                                    <label className="block text-xl font-semibold text-gray-900">
                                        {file ? file.name : 'Drop your genomic data file here'}
                                    </label>
                                    <p className="mt-2 text-base text-gray-600">
                                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'or select a file'}
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
                                {file && (
                                    <button
                                        type="submit"
                                        className="w-full mt-6 py-4 px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-lg font-medium"
                                    >
                                        Analyze Genomic Data
                                    </button>
                                )}
                                {error && (
                                    <p className="mt-4 text-red-600 text-center">{error}</p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                <Loader2 ref={loaderRef} className="mx-auto h-12 w-12 text-indigo-600 animate-spin" />
                                <p className="mt-4 text-xl font-semibold text-gray-900">{processStep}</p>
                                <p className="mt-2 text-base text-gray-600">Please wait while we process your data...</p>
                            </div>
                        )}
                    </form>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg fade-in">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-gray-600 mr-3 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">Privacy & Data Usage</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Your data is analyzed securely and used only for personalized insights and equity analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}