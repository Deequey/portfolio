"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const moonContainerRef = useRef<HTMLDivElement>(null);
  const developerTextRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(1200, 1200);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    const leftLight = new THREE.DirectionalLight(0xffffff, 0.6);
    leftLight.position.set(-10, 0, 0);
    scene.add(leftLight);

    const rightLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rightLight.position.set(10, 0, 0);
    scene.add(rightLight);

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    const moonTexture = textureLoader.load('/textures/moon.jpg');

    const material = new THREE.MeshStandardMaterial({ 
      map: moonTexture,
      roughness: 0.7,
      metalness: 0.1,
      emissive: 0x444444,
      emissiveIntensity: 0.2,
    });

    const moon = new THREE.Mesh(geometry, material);
    moon.scale.set(0.05, 0.05, 0.05);
    scene.add(moon);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // === ROTACJA PRZEZ CAŁY CZAS (0-100% scrollu) ===
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    })
    .to(moon.rotation, {
      y: Math.PI * 6,
      ease: "none",
    });

    // === FAZA 1: Powiększenie (0-40% scrollu) ===
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "40% bottom",
        scrub: true,
      }
    })
    .to(moon.scale, {
      x: 1,
      y: 1,
      z: 1,
      ease: "power2.out",
    });

    // === FAZA 2: Przesunięcie księżyca w lewo (35-80% scrollu) ===
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "35% top",
        end: "80% bottom",
        scrub: true,
      }
    })
    .to(moonContainerRef.current, {
      x: "-25vw", // Zmniejszone z -35vw na -25vw
      ease: "power2.inOut",
    }, 0)
    .to(moon.scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      ease: "power2.inOut",
    }, 0);

    // === Animacje tekstu - cosmic phase (znikanie) ===
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "30% top",
        end: "45% top",
        scrub: true,
      }
    })
    .to([titleRef.current, subtitleRef.current, bottomLeftRef.current, bottomRightRef.current], {
      opacity: 0,
      y: -50,
      ease: "power2.in",
    });

    // === Animacje tekstu - developer reveal (pojawianie) ===
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "45% top",
        end: "65% top",
        scrub: true,
      }
    })
    .fromTo(developerTextRef.current, 
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      const container = containerRef.current;
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      moonTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <section className="fixed inset-0 z-0 pointer-events-none">
        <div className="min-h-screen relative p-8 max-w-[1600px] mx-auto">
          {/* Cosmic Phase Text - Góra */}
          <div ref={titleRef} className="absolute top-8 left-8">
            <h1 className="font-display font-bold text-6xl mb-4">COSMOS</h1>
            <p className="font-display text-xl">Infinity in every direction</p>
          </div>

          <div ref={subtitleRef} className="absolute top-8 right-8 text-right">
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING GREATER</h2>
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING UNKNOWN</h2>
            <p className="font-display text-xl">Yet so beautiful</p>
          </div>

          {/* Moon Container */}
          <div 
            ref={moonContainerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div 
              ref={containerRef}
              className="w-auto h-auto"
            />
          </div>

          {/* Cosmic Phase Text - Dół */}
          <div ref={bottomLeftRef} className="absolute bottom-8 left-8">
            <h2 className="font-display font-bold text-5xl mb-2">Space</h2>
            <p className="font-display text-xl">Where imagination begins</p>
          </div>

          <div ref={bottomRightRef} className="absolute bottom-8 right-8 text-right">
            <h2 className="font-display font-bold text-6xl">DISCOVER MORE</h2>
          </div>

          {/* Developer Reveal Text */}
          <div 
            ref={developerTextRef}
            className="absolute top-1/2 right-[10%] -translate-y-1/2 text-right opacity-0"
          >
            <h2 className="font-display font-bold text-7xl mb-6 leading-tight">
              DEEQUEY
            </h2>
            <h3 className="font-display font-bold text-5xl mb-4 text-blue-400">
              Web Developer
            </h3>
            <p className="font-display text-2xl mb-3 max-w-md ml-auto">
              Pozwól się
            </p>
            <p className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              zaskoczyć
            </p>
            <div className="mt-8 space-y-2 text-lg">
              <p className="opacity-80">Frontend • Design • Experience</p>
              <p className="opacity-80">Projektuję strony, które nie tylko działają, <br></br>ale też budzą emocje i pozostają w pamięci.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 pointer-events-none">
        <div className="h-[500vh]"></div>
      </div>
    </>
  );
}
