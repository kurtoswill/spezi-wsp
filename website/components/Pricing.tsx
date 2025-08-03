import React from 'react';

export const Pricing = () => {
    return (
        <div className="mt-44 mx-auto scroll-mt-36" id="pricing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left side - Text content */}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-6">
                        Find the right plan for your growth.
                    </h2>
                    <p className="text-base sm:text-lg max-w-2xl mb-8">
                        Start with the Free plan and experience how better communication unlocks new opportunities. Upgrade anytime to accelerate your progress.
                    </p>

                    {/* Contact section */}
                    <div className="mt-auto">
                        <p className="text-gray-600">
                            Want custom integrations? {' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                                Contact us
                            </a>
                            {' '}for enterprise solutions.
                        </p>
                    </div>
                </div>

                {/* Right side - Pricing cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Free Plan */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Free</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold">₱0</span>
                                <span className="text-gray-500 ml-2">/month</span>
                            </div>
                            <p className="text-gray-600">Perfect for getting started with basic speech improvement</p>
                        </div>

                        <div className="mb-8">
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Basic filler word detection</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>5 practice sessions per month</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Basic progress tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Email support</span>
                                </li>
                            </ul>
                        </div>

                        <button className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Get Started
                        </button>

                        <p className="text-sm text-gray-500 mt-4 text-center">
                            Not ready to upgrade yet? Stay on Free and keep improving.
                        </p>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Most Popular
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Premium</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold">₱499</span>
                                <span className="text-gray-300 ml-2">/month</span>
                            </div>
                            <p className="text-gray-300">Advanced features for serious speech improvement</p>
                        </div>

                        <div className="mb-8">
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Advanced AI feedback on tone & pacing</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Unlimited practice sessions</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Regional accent personalization</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>ESL level customization</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Detailed analytics & insights</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Priority support</span>
                                </li>
                            </ul>
                        </div>

                        <button className="w-full py-3 px-6 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            Upgrade to Premium
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};