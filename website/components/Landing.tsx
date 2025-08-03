import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const Landing = ({ waitlistCount }: { waitlistCount: number | null }) => {
  return (
      <div className="flex flex-col lg:flex-row justify-between items-center mx-auto mt-8 md:mt-12 lg:mt-16 px-4 md:px-8 lg:px-12 xl:px-16 gap-8 lg:gap-12">
        {/* Content Section */}
        <div className="flex flex-col text-center items-center justify-center lg:items-start lg:justify-start lg:text-left gap-6 lg:gap-8 max-w-5xl lg:flex-1">
          <div className="space-y-4 lg:space-y-6">
            <h1 className="font-extrabold font-sora text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl leading-tight">
              Speak English Professionally and Confidently
            </h1>
            <p className="font-manrope font-medium text-lg sm:text-xl md:text-xl lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
              Built for English as a Second Language (ESL) professionals, Spezi
              gives you real-time, accent-aware feedback to help you communicate
              clearly in global meetings.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
                className="px-4 py-3 text-sm sm:text-base font-semibold h-12 flex-1 sm:flex-initial sm:px-6"
                variant="default"
            >
              Download Extension
            </Button>
            <Button
                className="px-4 py-3 text-sm sm:text-base font-semibold h-12 flex-1 sm:flex-initial sm:px-6 flex items-center justify-center gap-2"
                variant="outline"
            >
              Watch Demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Waitlist count - Desktop */}
          {waitlistCount !== null && (
              <p className="text-sm text-gray-600 hidden lg:block mt-2">
                {waitlistCount.toLocaleString()} people have already joined the waitlist.
              </p>
          )}
        </div>

        {/* Images Section */}
        <div className="flex items-center justify-center gap-4 sm:gap-4 lg:gap-6 flex-shrink-0 lg:flex-1 lg:justify-end">
          <div className="relative">
            <Image
                src="/images/placeholder.jpg"
                width={280}
                height={461}
                className="w-[160px] h-[280px] sm:w-[140px] sm:h-[240px] md:w-[160px] md:h-[280px] lg:w-[180px] lg:h-[320px] xl:w-[200px] xl:h-[360px] object-cover rounded-lg shadow-2xl"
                alt="Professional using Spezi"
                priority
                unoptimized
            />
          </div>
          <div className="relative">
            <Image
                src="/images/placeholder.jpg"
                width={280}
                height={540}
                className="w-[160px] h-[320px] sm:w-[140px] sm:h-[280px] md:w-[160px] md:h-[320px] lg:w-[180px] lg:h-[360px] xl:w-[200px] xl:h-[400px] object-cover rounded-lg shadow-2xl"
                alt="Spezi interface demonstration"
                priority
                unoptimized
            />
          </div>
        </div>

        {/* Waitlist count - Mobile */}
        {waitlistCount !== null && (
            <p className="text-sm text-gray-600 lg:hidden text-center mt-4">
              {waitlistCount.toLocaleString()} people have already joined the waitlist.
            </p>
        )}
      </div>
  );
};
