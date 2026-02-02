'use client';

import { Star, Target, BadgeCheck } from 'lucide-react';

export default function WhyUsSection() {
  return (
    <section className="bg-blue-800 text-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-12">Invest in your career</h2>

      <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
   
        <div className="flex flex-col items-center space-y-4">
          <Target className="w-10 h-10" />
          <h3 className="text-lg font-semibold">Explore new skills</h3>
          <p className="text-sm max-w-xs">
            Access 10,000+ courses in AI, business, technology, and more.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <BadgeCheck className="w-10 h-10" />
          <h3 className="text-lg font-semibold">Earn valuable credentials</h3>
          <p className="text-sm max-w-xs">
            Get certificates for every course you finish and boost your chances of getting hired after your trial ends at no additional cost.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Star className="w-10 h-10" />
          <h3 className="text-lg font-semibold">Learn from the best</h3>
          <p className="text-sm max-w-xs">
            Take your skills to the next level with expert-led courses and Academix Coach, your AI-powered guide.
          </p>
        </div>
      </div>
    </section>
  );
}
