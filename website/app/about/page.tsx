"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Import Autoplay plugin from carousel library
import Autoplay from "embla-carousel-autoplay";


interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  avatar?: string;
  socialLinks?: SocialLinks;
}

const TeamMember = ({ name, role, avatar, socialLinks }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 text-center">
      <div className="w-full h-auto mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover rounded-lg"
            unoptimized
          />
        ) : (
          <span className="text-white text-2xl font-semibold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-[#232C4F] mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{role}</p>
      <div className="flex justify-center gap-5">
        {socialLinks?.facebook && (
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <Image src="/icons/fb.svg" alt="Facebook" width={20} height={20} />
          </a>
        )}
        {socialLinks?.instagram && (
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <Image src="/icons/ig.svg" alt="Instagram" width={20} height={20} />
          </a>
        )}
        {socialLinks?.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
          </a>
        )}
      </div>
    </div>
  );
};

const ExpandableText = ({
  children,
  previewLength = 150,
  className = "",
}: {
  children: React.ReactNode;
  previewLength?: number;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return node.toString();
    if (React.isValidElement(node)) {
      // TypeScript: node is React.ReactElement<any, any>
      return getTextContent((node.props as { children?: React.ReactNode }).children);
    }
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    return "";
  };

  const textContent = getTextContent(children);
  const shouldTruncate = textContent.length > previewLength;

  const renderInlineContent = () => {
    if (!shouldTruncate) return children;

    if (isExpanded) {
      return (
        <>
          {children}{" "}
          <button
            onClick={() => setIsExpanded(false)}
            className="opacity-50 hover:text-[#232C4F] font-base transition-opacity duration-200 cursor-pointer"
          >
            See less
          </button>
        </>
      );
    }

    const truncated = textContent.slice(0, previewLength).trimEnd() + "...";

    return (
      <>
        {truncated}{" "}
        <button
          onClick={() => setIsExpanded(true)}
          className="opacity-50 hover:text-[#232C4F] font-base transition-opacity duration-200 cursor-pointer"
        >
          See more
        </button>
      </>
    );
  };

  return (
    <div className={className}>
      <span className="block lg:hidden">{renderInlineContent()}</span>
      <span className="hidden lg:block">{children}</span>
    </div>
  );
};

const Page = () => {
  const teamMembers = [
    {
      name: "Kurt Oswill McCarver",
      role: "Developer",
      avatar: "/images/kurt.jpg",
      socialLinks: {
        facebook: "https://facebook.com/kurt.mccarver",
        instagram: "https://instagram.com/kurt.mccarver",
        linkedin: "https://linkedin.com/in/kurt-mccarver",
      },
    },
    {
      name: "Niles Tristan Cabrera",
      role: "Developer",
      avatar: "/images/kurt.jpg",
      socialLinks: {
        facebook: "https://facebook.com/niles.cabrera",
        instagram: "https://instagram.com/niles.cabrera",
        linkedin: "https://linkedin.com/in/niles-cabrera",
      },
    },
    {
      name: "Gianfranco Lobaton",
      role: "Business Lead",
      avatar: "/images/kurt.jpg",
      socialLinks: {
        facebook: "https://facebook.com/gianfranco.lobaton",
        instagram: "https://instagram.com/gianfranco.lobaton",
        linkedin: "https://linkedin.com/in/gianfranco-lobaton",
      },
    },
    {
      name: "Verah Janae Dulay",
      role: "Researcher | Designer",
      avatar: "/images/kurt.jpg",
      socialLinks: {
        facebook: "https://facebook.com/verah.dulay",
        instagram: "https://instagram.com/verah.dulay",
        linkedin: "https://linkedin.com/in/verah-dulay",
      },
    },
    {
      name: "Kazel Arwen Tuazon",
      role: "UI/UX Lead | Researcher",
      avatar: "/images/kazel.jpg",
      socialLinks: {
        facebook: "https://facebook.com/kazel.tuazon",
        instagram: "https://instagram.com/kazel.tuazon",
        linkedin: "https://linkedin.com/in/kazel-tuazon",
      },
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  



  return (

    
    <div className="mt-8 flex flex-col gap-10 lg:gap-52">
      {/* Header Section */}
      <header>
        <div className="font-extrabold font-sora text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl leading-tight text-center max-w-4xl mx-auto">
          Behind Spezi: The People, Purpose, and Principles
        </div>
        <div className="flex flex-col text-center mt-5 lg:flex-row lg:text-left lg:mt-18 justify-center gap-8 lg:gap-40 items-center">
          <div className="flex gap-5 flex-col max-w-2xl">
            <div className="font-bold text-[35px] lg:text-[40px]">About Us</div>
            <ExpandableText previewLength={200} className="text-base sm:text-lg leading-relaxed">
              <p>
                <b>Spezi</b> is a browser-based communication assistant built
                specifically for <b>English as a Second Language (ESL) professionals.</b> We
                believe that great ideas shouldn't be lost in translation — that's
                why we created a tool that supports confident, clear communication
                during and after your online meetings. Whether you're pitching to
                clients, collaborating with global teams, or leading virtual
                classrooms, <b>Spezi gives you real-time and post-call feedback</b> tailored
                to your unique voice, accent, and communication style.
                We're a small, passionate team of developers, designers, and
                language learners committed to making global communication more
                inclusive and empowering for everyone.
              </p>
            </ExpandableText>
          </div>
          <Image
            src="/images/placeholder.jpg"
            width={400}
            height={300}
            className="w-[350px] h-[262.5px] lg:w-[400px] lg:h-[300px] object-cover rounded-[10px] shadow-xl flex-shrink-0"
            alt="placeholder"
            unoptimized
          />
        </div>
      </header>

      {/* Mission and Vision */}
      <section className="flex flex-col-reverse lg:flex-row justify-center gap-8 lg:gap-40 items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/images/placeholder.jpg"
            width={280}
            height={540}
            className="w-[130px] h-[262px] lg:w-[200px] lg:h-[390px] object-cover rounded-[10px] shadow-xl"
            alt=""
            unoptimized
          />
          <Image
            src="/images/placeholder.jpg"
            width={280}
            height={461}
            className="w-[130px] h-[220px] lg:w-[200px] lg:h-[350px] object-cover rounded-[10px] shadow-xl"
            alt=""
            unoptimized
          />
        </div>
        <div className="flex gap-5 flex-col max-w-2xl text-center lg:text-left shrink-[3]">
          <div className="font-bold text-[35px] lg:text-[40px]">Mission</div>
          <ExpandableText previewLength={120} className="text-base sm:text-lg leading-relaxed">
            <p>
              Spezi empowers ESL professionals to communicate with clarity and confidence through real-time and personalized feedback. We help ensure that language never stands in the way of sharing ideas, leading conversations, or connecting across cultures.
            </p>
          </ExpandableText>

          <div className="font-bold text-[35px] lg:text-[40px]">Vision</div>
          <ExpandableText previewLength={120} className="text-base sm:text-lg leading-relaxed">
            <p>
              We envision a world where global communication is inclusive, fluent, and accessible — where every voice is heard, every idea is understood, and language is a bridge, not a barrier.
            </p>
          </ExpandableText>
        </div>
      </section>

      {/* Our Story */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 md:gap-16 lg:gap-24 xl:gap-32 px-4 sm:px-6">
        <div className="flex flex-col gap-5 max-w-2xl text-center lg:text-left">
          <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold">
            Our Story
          </h1>
          <ExpandableText previewLength={200} className="space-y-4">
            <p className="text-base sm:text-lg leading-relaxed">
              Spezi was born out of countless stories from Filipino professionals
              and OFWs who felt silenced in virtual rooms not because they lacked
              skill, but because they lacked support.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              We started this project after seeing how language gaps affected job
              performance, team dynamics, and even self-esteem in global remote
              work environments. From hackathons to research-based prototypes, we
              crafted Spezi to be an accessible, real-time coaching tool — no
              seminars or expensive lessons required.
            </p>
          </ExpandableText>
        </div>

        <Image
          src="/images/placeholder.jpg"
          width={400}
          height={300}
          className="w-full max-w-sm object-cover rounded-[10px] shadow-xl"
          alt="Our Story"
        />
      </div>

      {/* Meet the Team */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-[40px] font-bold text-[#232C4F] mb-4">
            Meet Our Team
          </h2>
          <p className="max-w-2xl mx-auto">
            The passionate individuals behind Spezi who are dedicated to
            empowering Filipino professionals worldwide
          </p>
        </div>

        {/* Mobile: Carousel */}
        <div className="block lg:hidden">
          <Carousel
            ref={carouselRef}
            opts={{ align: "center", loop: true }}
            className="w-full max-w-6xl mx-auto"
            plugins={[
              Autoplay({ delay: 2000, stopOnInteraction: false }),
            ]}
          >
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-4">
                  <TeamMember {...member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-4">
            </div>
          </Carousel>
        </div>

        {/* Desktop: Row */}
        <div className="hidden lg:flex flex-row justify-center gap-8 mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
