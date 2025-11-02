"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    moon.scale.set(0.05, 0.05, 0.05); // Zaczynamy od małego
    scene.add(moon);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Timeline GSAP - rotacja + skala razem
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Rotacja
    timeline.to(moon.rotation, {
      y: Math.PI * 4,
      ease: "none",
    }, 0); // 0 = zaczynają się równocześnie

    // Skala - od 0.5 do 3 (6x większy!)
    timeline.to(moon.scale, {
      x: 1,
      y: 1,
      z: 1,
      ease: "none",
    }, 0); // 0 = równocześnie z rotacją

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
          <div className="absolute top-8 left-8">
            <h1 className="font-display font-bold text-6xl mb-4">COSMOS</h1>
            <p className="font-display text-xl">Infinity in every direction</p>
          </div>

          <div className="absolute top-8 right-8 text-right">
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING GREATER</h2>
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING UNKNOWN</h2>
            <p className="font-display text-xl">Yet so beautiful</p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
              ref={containerRef}
              className="w-auto h-auto border-red-500 border"
            />
          </div>

          <div className="absolute bottom-8 left-8">
            <h2 className="font-display font-bold text-5xl mb-2">Space</h2>
            <p className="font-display text-xl">Where imagination begins</p>
          </div>

          <div className="absolute bottom-8 right-8 text-right">
            <h2 className="font-display font-bold text-6xl">DISCOVER MORE</h2>
          </div>
        </div>
      </section>

      <div className="relative z-10 pointer-events-none">
        <div className="h-[300vh]"></div>
      </div>
    </>
  );
}
