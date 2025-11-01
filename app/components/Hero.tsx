"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Oświetlenie
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Sfera jako księżyc
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load(
      'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg'
    );

    const material = new THREE.MeshStandardMaterial({ 
      map: moonTexture,
      roughness: 0.8,
      metalness: 0.1
    });

    const moon = new THREE.Mesh(geometry, material);
    scene.add(moon);

    // Rotacja kontrolowana scrollem
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / maxScroll;
      
      // Obracaj księżyc proporcjonalnie do scrollu
      moon.rotation.y = scrollProgress * Math.PI * 4; // 2 pełne obroty
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const container = containerRef.current;
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* FIXED HERO SECTION - pozostaje na miejscu */}
      <section className="fixed inset-0 z-0 pointer-events-none">
        <div className="min-h-screen relative p-8 max-w-[1600px] mx-auto">
          {/* Top Left - KOSMOS */}
          <div className="absolute top-8 left-8">
            <h1 className="font-display font-bold text-6xl mb-4">COSMOS</h1>
            <p className="font-display text-xl">Infinity in every direction</p>
          </div>

          {/* Top Right */}
          <div className="absolute top-8 right-8 text-right">
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING GREATER</h2>
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING UNKNOWN</h2>
            <p className="font-display text-xl">Yet so beautiful</p>
          </div>

          {/* Center - 3D Moon (TYLKO TO SIĘ KRĘCI) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
              ref={containerRef}
              className="w-[600px] h-[600px]"
            />
          </div>

          {/* Bottom Left - Space */}
          <div className="absolute bottom-8 left-8">
            <h2 className="font-display font-bold text-5xl mb-2">Space</h2>
            <p className="font-display text-xl">Where imagination begins</p>
          </div>

          {/* Bottom Right - DISCOVER MORE */}
          <div className="absolute bottom-8 right-8 text-right">
            <h2 className="font-display font-bold text-6xl">DISCOVER MORE</h2>
          </div>
        </div>
      </section>

      {/* SCROLLABLE CONTENT - niewidoczny spacer do scrollowania */}
      <div className="relative z-10 pointer-events-none">
        <div className="h-[300vh]"></div>
      </div>
    </>
  );
}
