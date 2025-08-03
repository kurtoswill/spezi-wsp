/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const ExpandableText = ({ children, maxLength = 200 }: { children: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const text = children;
  const shouldTruncate = text.length > maxLength;
  const truncatedText = text.slice(0, maxLength);
  const remainingText = text.slice(maxLength);

  return (
    <div>
      <p className="text-base sm:text-lg leading-relaxed">
        {/* Show dynamic text on mobile, full text on desktop */}
        <span className="block sm:hidden">
          {shouldTruncate ? (
            <>
              {isExpanded ? text : truncatedText}
              {!isExpanded && "... "}
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="opacity-50 hover:text-[#232C4F] font-base transition-opacity duration-200 cursor-pointer"
                >
                  See more
                </button>
              )}
            </>
          ) : (
            text
          )}
        </span>
        <span className="hidden sm:block">
          {text}
        </span>
      </p>
      {/* Show "See less" button only when expanded */}
      {shouldTruncate && isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="opacity-50 hover:text-[#232C4F] font-base transition-opacity duration-200 cursor-pointer sm:hidden mt-5"
        >
          See less
        </button>
      )}
    </div>
  );
};

export const Features = () => {
  return (
    <div className="text-[#232C4F] my-16 sm:my-24 md:my-32 lg:my-40 max-w-7xl mx-auto scroll-mt-32" id="features">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:gap-5 items-center text-center mb-24 sm:mb-24 md:mb-24 lg:mb-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight px-4">
          Enhance How You Speak, Effortlessly
        </h1>
        <p className="text-base sm:text-lg max-w-2xl px-4">
          Spezi gives instant, in-meeting feedback to help you speak clearer and
          more confidently — no coach required.
        </p>
      </div>

      <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
        {/* Real-time feedback */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-40 items-center">
          <div className="w-full lg:max-w-3xl flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight">
              Real-time feedback
            </h2>
            <ExpandableText maxLength={150}>
              Get live, in-the-moment feedback on how you speak — from detecting
              filler words and awkward pauses to evaluating pacing and tone.
              Spezi personalizes its feedback based on your regional accent and
              ESL level, offering simple, practical tips as you speak. No need
              to rewatch recordings or attend extra training — just plug in and
              improve naturally during every conversation.
            </ExpandableText>
          </div>

          <div className="w-full max-w-[520px] h-[200px] sm:h-[240px] md:h-[280px] lg:w-[520px] lg:h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
            {/*Real-time feedback visualization*/}
          </div>
        </div>

        {/* Post-meeting recaps */}
        <div className="flex flex-col lg:flex-row-reverse justify-center gap-8 lg:gap-40 items-center">
          <div className="w-full lg:max-w-3xl flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight">
              Post-meeting recaps
            </h2>
            <ExpandableText maxLength={150}>
              After each meeting, Spezi generates a detailed yet
              easy-to-understand summary of your communication performance.
              You'll get targeted suggestions on pronunciation, clarity,
              delivery, and pacing. These recaps help you identify specific
              areas for improvement and track your progress over time, without
              needing to sift through full recordings.
            </ExpandableText>
          </div>

          <div className="w-full max-w-[520px] h-[200px] sm:h-[240px] md:h-[280px] lg:w-[520px] lg:h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
            {/*Post-meeting recaps visualization*/}
          </div>
        </div>

        {/* Trend tracking overtime */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-40 items-center">
          <div className="w-full lg:max-w-3xl flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight">
              Trend tracking overtime
            </h2>
            <ExpandableText maxLength={150}>
              See how your speaking patterns and habits are improving in areas
              like confidence, pacing, grammar, and clarity. It visualizes your
              progress through easy-to-read charts and offers ESL-specific
              insights that guide your learning journey. This allows you to stay
              motivated and focused as you see how your communication skills
              evolve with each session.
            </ExpandableText>
          </div>

          <div className="w-full max-w-[520px] h-[200px] sm:h-[240px] md:h-[280px] lg:w-[520px] lg:h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
            {/*Trend tracking visualization*/}
          </div>
        </div>

        {/* Personalized improvement plans */}
        <div className="flex flex-col lg:flex-row-reverse justify-between gap-8 lg:gap-40 items-center">
          <div className="w-full lg:max-w-3xl flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight">
              Personalized improvement plans
            </h2>
            <ExpandableText maxLength={150}>
              Spezi creates tailored improvement plans based on your performance
              in each recorded session. These plans include practical exercises,
              pronunciation tips, and speaking strategies that focus on your
              unique challenges as an ESL speaker. By addressing specific areas
              like clarity, fluency, and confidence, the app helps you grow
              steadily and goals more effectively in professional settings.
            </ExpandableText>
          </div>

          <div className="w-full max-w-[520px] h-[200px] sm:h-[240px] md:h-[280px] lg:w-[520px] lg:h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
            {/*Personalized improvement plans visualization*/}
          </div>
        </div>
      </div>
    </div>
  );
};