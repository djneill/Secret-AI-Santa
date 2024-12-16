'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { Gift, Users, DollarSign, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Snow component with no SSR
const Snow = dynamic(() => Promise.resolve(() => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-fall"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 5}s`,
          opacity: Math.random(),
          width: `${Math.random() * 5 + 3}px`,
          height: `${Math.random() * 5 + 3}px`
        }}
      >
        <div className="h-full w-full bg-white rounded-full" />
      </div>
    ))}
  </div>
)), {
  ssr: false
});

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Snow Effect */}
      <Suspense fallback={null}>
        <Snow />
      </Suspense>

      {/* Hero Section */}
      <div className="bg-gradient-to-bl from-red-600 to-green-700 text-white overflow-hidden">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={`text-5xl font-bold mb-6 transition-all duration-1000 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Elecretanta
            </h1>
            <p
              className={`text-xl mb-8 transition-all duration-1000 delay-300 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              The AI-powered Secret Santa platform that makes gift-giving magical.
              Never worry about finding the perfect gift again.
            </p>
            <div
              className={`flex gap-4 justify-center transition-all duration-1000 delay-500 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <Link href={'/signin'}>
                <Button
                  variant={'outline'}
                  className="bg-white text-red-600 hover:text-white hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Section */}
      <div className="bg-white py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Spread Joy
            </h2>
            <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Everything you need for the perfect Secret Santa
            </p>
            <p className={`text-gray-600 mt-2 transition-all duration-700 delay-300 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Let our magical elves help you find the perfect gift for your Secret Santa recipient.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Your existing feature cards */}
            {/* AI Feature */}
            <div
              className={`bg-red-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-red-600 animate-pulse" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered Gift Suggestions</h3>
              <p className="text-gray-600">
                Our Elf Secret Santa AI technology analyzes preferences to find the perfect gift.
              </p>
            </div>

            {/* Profile Feature */}
            <div
              className={`bg-green-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-6 w-6 text-green-600 animate-bounce" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Personal Profiles</h3>
              <p className="text-gray-600">
                Create and customize your profile with interests, hobbies, and wishlist items.
              </p>
            </div>

            {/* Group Feature */}
            <div
              className={`bg-blue-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600 animate-bounce" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Group Management</h3>
              <p className="text-gray-600">
                Easily create and manage Secret Santa groups with custom budgets.
              </p>
            </div>

            {/* Budget Feature */}
            <div
              className={`bg-yellow-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-yellow-600 animate-pulse hover:animate-spin" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Budget Control</h3>
              <p className="text-gray-600">
                Set and manage gift budgets to ensure everyone stays within limits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 relative">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p className={`transition-all duration-700 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            © 2024 Elecretanta. Let&apos;s make gift-giving magical together! 🎄
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;