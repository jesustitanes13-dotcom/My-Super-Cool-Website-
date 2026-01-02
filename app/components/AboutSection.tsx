"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

function SkillCard({ title, skills, color }: { title: string; skills: string[]; color: string; }) {
  return (
    <div className={`bg-[#181818] p-4 rounded-lg hover:bg-[#232323] transition-all duration-300`}>
      <h3 className={`text-xl font-semibold mb-2 text-${color}-500`}>{title}</h3>
      <ul className="list-none space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="text-gray-300">{skill}</li>
        ))}
      </ul>
    </div>
  );
}

const HobbyCard = ({ icon, text, color }: { icon: React.ReactNode, text: string, color: string }) => (
  <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#232323] transition-colors">
    <div className="flex items-center space-x-2">
      <div className={`text-${color}-500`}>{icon}</div>
      <span>{text}</span>
    </div>
  </div>
);

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillCard 
          title="Technical Skills" 
          skills={["Generative AI Prompt", "Web Platform Development", "Video editing", "Data Analysis"]}
          color="Red"
        />
        <SkillCard 
          title="Soft Skills" 
          skills={["Complex Problem Solver", "Time Management", "Persistence", "Leadership"]}
          color="Blue"
        />
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <div className="space-y-8 relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"></div>
        {/* Bachelors Degree */}
        <div className="flex flex-col space-y-2 relative z-10">
          <h3 className="text-xl font-bold text-white">
            Bachelor&apos;s in Computer Science
          </h3>
          <p className="text-gray-300">University of Texas Rio Grande Valley</p>
          <div className="flex items-center space-x-2">
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <span className="text-sm text-gray-400">Undergraduate Studies</span>
          </div>
            {/* Minor en Business Analytics */}
            <div className="flex flex-col space-y-1 mt-2">
              <h4 className="text-lg font-semibold text-white">Minor en Business Analytics</h4>
              <span className="text-sm text-gray-300">University of Texas Rio Grande Valley</span>
            </div>
        </div>
      </div>
    ),
  },
  {
    title: "Hobbies",
    id: "hobbies",
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <HobbyCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path stroke="currentColor" strokeWidth="1.5" d="M12 2v20M2 12h20M8 8l2 2m4-2l-2 2m-2 4l2 2m4-2l-2 2"/>
          </svg>}
          text="Playing Soccer"
          color="Blue"
        />
        <HobbyCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="6" cy="12" r="3" fill="currentColor"/>
            <circle cx="18" cy="12" r="3" fill="currentColor"/>
            <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2"/>
          </svg>}
          text="GYM"
          color="red"
        />
        <HobbyCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path stroke="currentColor" strokeWidth="2" d="M8 21h8M12 17v4"/>
          </svg>}
          text="Watching Animated Shows"
          color="blue"
        />
        <HobbyCard 
          icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>}
          text="Spending Time with Family"
          color="White"
        />
        <HobbyCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>}
          text="Playing Video Games"
          color="Blue"
        />
        <HobbyCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>}
          text="Drawing"
          color="red"
        />
      </div>
    ),
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    '/images/ImageCarousel/Espejo.jpeg',
    '/images/ImageCarousel/Fotovideo1.jpeg',
    '/images/ImageCarousel/Mirada.jpeg',
    '/images/ImageCarousel/Trofeo 1.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"></div>
      
      {/* Image container */}
      <div className="relative h-full">
        {images.map((img, index) => (
          <Image
            key={index}
            src={encodeURI(img)}
            alt={`About image ${index + 1}`}
            fill
            className={`object-contain object-center transition-all duration-500 ${
              index === currentIndex 
                ? "opacity-100" 
                : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white w-4" 
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: any) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
            About Me
          </h2>
          
          <div className="space-y-8">
            <p className="text-base lg:text-lg leading-relaxed">
              <span className="block text-gray-300 hover:text-white transition-colors duration-300">
                A first-generation immigrant from Venezuela, I arrived in Texas at 16 without speaking English and became captain of my high school soccer team, MVP, and a recipient of the 2025 Texas Academic All-State award. My family sacrificed everything so I could be here. That passion continues to drive every line of code I write.
              </span>
            </p>

            <p className="text-base lg:text-lg leading-relaxed">
              <span className="block text-gray-300 hover:text-white transition-colors duration-300">
                I&apos;m a UTRGV student who enjoys advanced prompt engineering and developing autonomous agents with AI. I use AI daily to automate my life: personalized study guides, English practice, email responses, web applications, and personal projects, learning 10 times faster and turning ideas into working prototypes in days, not months.
              </span>
            </p>

            <p className="text-base lg:text-lg leading-relaxed">
              <span className="block text-gray-300 hover:text-white transition-colors duration-300">
                I&apos;m majoring in Computer Science with a specialization in Business Analytics because I want to master artificial intelligence and quantitative finance to create tools that generate real wealth and opportunities. My goal for the summer of 2026: to land a full-time tech internship in AI, software engineering, or fintech and prove that discipline, leadership, and ambition overcome any starting point.
              </span>
            </p>

          </div>

          <div className="relative">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"></div>
            
            {/* Tab container */}
            <div className="relative flex flex-row justify-start mt-12 mb-8 p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 gap-2">
              <TabButton
                selectTab={() => handleTabChange("education")}
                active={tab === "education"}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
                  </svg>
                  Education
                </div>
              </TabButton>
              
              <TabButton
                selectTab={() => handleTabChange("skills")}
                active={tab === "skills"}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Skills
                </div>
              </TabButton>
              
              <TabButton
                selectTab={() => handleTabChange("hobbies")}
                active={tab === "hobbies"}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hobbies
                </div>
              </TabButton>
            </div>
          </div>

          <div className="mt-8 p-4">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
        <ImageCarousel />
      </div>
    </section>
  );
};

export default AboutSection;