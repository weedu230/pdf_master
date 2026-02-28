import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Built by a Student, For Everyone
            </h1>
            <p className="text-xl md:text-2xl text-red-100">
              A solo project focused on simplicity, speed, and privacy
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 animate-fade-in-up-delay-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Hi, I'm Waleed</h2>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm a <strong>Software Engineering student</strong> building this platform while studying and experimenting with real-world systems. This isn't backed by a big company or VC funding—it's just me, learning and building in public.
            </p>
          </div>

          {/* The Problem */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 animate-fade-in-up-delay-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Why I Built This</h2>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              It started with a simple frustration:
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
              <p className="text-lg text-gray-800 italic">
                "Why are basic PDF tools either slow, overloaded with ads, or forcing signups for simple tasks?"
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              I wanted something <strong>fast</strong>, <strong>clean</strong>, and <strong>privacy-focused</strong>. So instead of complaining, I decided to build it myself.
            </p>
          </div>

          {/* The Journey */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 animate-fade-in-up-delay-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">The Tech Behind It</h2>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Over the past few months, I've been designing and developing this platform using modern web technologies, focusing on creating a seamless and secure experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>React 18 with modern hooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Vite for lightning-fast builds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tailwind CSS for clean UI</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Backend
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Python with FastAPI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High-performance async processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure file handling with auto-cleanup</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Core Principles</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">•</span>
                  <span>Clean and minimal interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">•</span>
                  <span>Fast backend processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">•</span>
                  <span>Secure temporary file handling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">•</span>
                  <span>No forced login or signup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 animate-fade-in-up-delay-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Continuous Improvement</h2>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This is an <strong>independent student-built project</strong>, continuously improving with every update. I'm actively working on:
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-gray-700">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">Adding new PDF tools based on user feedback</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">Optimizing backend performance for faster processing</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">Improving security and privacy features</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">Refining the UI/UX for better user experience</span>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in-up-delay-3">
            <div className="text-center mb-8">
              <div className="inline-block w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4">Support the Project</h2>
              <p className="text-xl text-red-100 max-w-2xl mx-auto">
                If you find PDF Master useful and want to support its development, I'd really appreciate it!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <p className="text-lg text-red-50 mb-6 text-center">
                Your support helps me improve performance, add new tools, and keep the platform growing—all while I'm still learning and studying.
              </p>

              <div className="bg-white rounded-xl p-6 text-gray-900 max-w-md mx-auto">
                <p className="text-sm text-gray-600 mb-2 text-center">Support via JazzCash</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-3xl font-bold text-gray-900">0329-2270593</p>
                </div>
                <p className="text-sm text-gray-600 text-center italic">
                  Every support helps keep the servers running and motivates me to build more!
                </p>
              </div>

              <p className="text-center text-red-100 mt-6 text-sm">
                You can also sponsor the project on GitHub or reach out if you want to collaborate!
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-fade-in-up-delay-3">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to try the tools?
            </h3>
            <Link
              to="/tools"
              className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Explore All Tools →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
