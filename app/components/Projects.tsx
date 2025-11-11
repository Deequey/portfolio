"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Lorem Ipsum",
      category: "Lorem",
      description: "Lorem Ipsum dolor sit amet. Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet",
      year: "2025"
    },
    {
      id: 2,
      title: "Projekt 2",
      category: "Kategoria 2",
      description: "Opis 2",
      year: "Rok 2"
    },
    {
      id: 3,
      title: "Projekt 3",
      category: "Kategoria 3",
      description: "Opis 3",
      year: "Rok 3"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // jakis problem tu jest z triggerami ale nie wiem jaki
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", 
          end: "top 30%",   
          scrub: 1,
        }
      }
    );

    //podtytul rowniez zjebany
    gsap.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%", 
          end: "top 25%",   
          scrub: 1,
        }
      }
    );

    //cos tu nie dziala jeszcze nie wiem co
    projectRefs.current.forEach((project, index) => {
      if (!project) return;

      // main card
      gsap.fromTo(
        project,
        {
          opacity: 0,
          x: index % 2 === 0 ? -300 : 300,
          rotateY: index % 2 === 0 ? -45 : 45,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 75%", 
            end: "top 35%",   
            scrub: 1,
          }
        }
      );

      //paralax
      gsap.to(project, {
        y: index % 2 === 0 ? -100 : -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    });

    // reveal
    lineRefs.current.forEach((line, index) => {
      if (!line) return;

      gsap.fromTo(
        line,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 80%", 
            end: "top 50%",   
            scrub: 1,
          }
        }
      );
    });

    
    lineRefs.current.forEach((line, index) => {
      if (!line) return;

      gsap.fromTo(
        line,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black py-32 px-8"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-32">
          <div 
            ref={titleRef}
            className="text-center mb-8"
            style={{ perspective: "1000px" }}
          >
            <h2 className="font-display font-bold text-8xl mb-6">
              SELECTED
            </h2>
            <h2 className="font-display font-bold text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              PROJECTS
            </h2>
          </div>

          <div 
            ref={subtitleRef}
            className="text-center"
          >
            <p className="font-display text-2xl text-zinc-400 max-w-2xl mx-auto">
              Każdy projekt to nowa podróż przez nieskończone możliwości tworzenia
            </p>
          </div>
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => (
            <div key={project.id}>
              <div 
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-16"
                style={{ transformOrigin: "center" }}
              />

              <div
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                className="group relative"
                style={{ 
                  perspective: "2000px",
                  transformStyle: "preserve-3d" 
                }}
              >
                <div className="relative">
                  <div className="absolute -top-12 left-0 font-mono text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-black">
                    {String(project.id).padStart(2, '0')}
                  </div>

                  <div className="relative p-12 border border-zinc-900 hover:border-zinc-700 transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-700 pointer-events-none" />

                    <div className="relative flex flex-col lg:flex-row justify-between items-start gap-12">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-7xl mb-6 leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[#FF5A00] transition-all duration-700">
                          {project.title}
                        </h3>
                        <p className="font-display text-3xl text-[#8A8D91] mb-4">
                          {project.category}
                        </p>
                        <div className="w-24 h-1 bg-[#FF5A00]" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <p className="font-display text-xl text-zinc-400 leading-relaxed mb-8">
                          {project.description}
                        </p>

                        <div className="flex justify-between items-end">
                          <span className="font-mono text-5xl text-zinc-800 font-bold">
                            {project.year}
                          </span>

                          <button className="group/btn relative font-display px-8 py-4 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3 text-lg">
                              VIEW PROJECT
                              <svg 
                                className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                            <div className="absolute inset-0 border border-zinc-800 group-hover/btn:border-blue-500 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover/btn:from-purple-500/10 group-hover/btn:to-blue-500/10 transition-all duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F2F3F5] group-hover:border-[#B3001B] transition-all duration-500" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F2F3F5] group-hover:border-[#B3001B] transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F2F3F5] group-hover:border-[#B3001B] transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F2F3F5] group-hover:border-[#B3001B] transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <div className="inline-block">
            <p className="font-display text-xl text-zinc-600 mb-4">
              Więcej projektów wkrótce
            </p>
            <h3 className="font-display font-bold text-5xl text-transparent bg-clip-text bg-[#8A8D91]">
              W PRZYGOTOWANIU
            </h3>
          </div>
        </div>
      </div>

      <div className="h-[50vh]" />
    </section>
  );
}
