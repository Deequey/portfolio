"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// scrolltrigger
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // do gsapa
  const containerRef = useRef<HTMLDivElement>(null); // container dla threejs canvas
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const moonContainerRef = useRef<HTMLDivElement>(null);
  const developerTextRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // threejs - model

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

    //oswietlenie - miozliwie do zmiany
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


    // kolo
    const geometry = new THREE.SphereGeometry(2, 64, 64);

    // tekstura loader
    const textureLoader = new THREE.TextureLoader();

    const moonTexture = textureLoader.load('/textures/moon.jpg');


    //zbedne pierdolenie threejs
    const material = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.7,
      metalness: 0.1,
      emissive: 0x444444,
      emissiveIntensity: 0.2,
    });

    //mesh
    const moon = new THREE.Mesh(geometry, material);
    moon.scale.set(0.05, 0.05, 0.05);
    scene.add(moon);


    //animacja modelu
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    //gsap
    //krecenie
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    })
      .to(moon.rotation, {
        y: Math.PI * 3, //moze do zmiany? chuj wie zalezy ajk sie na to spojrzy
        ease: "none",
      });

    //size rosnie
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "60% bottom",
        scrub: true,
      }
    })
      .to(moon.scale, {
        x: 0.8,
        y: 0.8, //to prawdopodobnie bedzie do zmiany
        z: 0.8,
        ease: "power1.out",
      });

    //przesuwanie w lewo
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "32% top",
        end: "75% bottom",
        scrub: true,
      }
    })
      .to(moonContainerRef.current, {
        x: "-25vw", //do zmiany w rzyszlosci (wychodzi pwnie poza 1600px width)
        ease: "power2.inOut",
      }, 0)
      .to(moon.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        ease: "power2.inOut",
      }, 0);

    //znikanie poczatkowych tekstow z hero
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "25% top",
        end: "38% top",
        scrub: true,
      }
    })
      .to([titleRef.current, subtitleRef.current, bottomLeftRef.current, bottomRightRef.current], {
        opacity: 0,
        y: -50,
        ease: "power2.in",
      });

    //developer reveal
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "35% top",
        end: "55% top",
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

    //cleanup 
    return () => {
      // usuniecie scrolltriggerow (cos tam z memory leaks)
      ScrollTrigger.getAll().forEach(t => t.kill());

      // wywalenie canvas
      const container = containerRef.current;
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // wywalenie z pamieci threejs
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

          <div ref={titleRef} className="absolute top-8 left-8">
            <h1 className="font-display font-bold text-6xl mb-4">COSMOS</h1>
            <p className="font-display text-xl">Infinity in every direction</p>
          </div>

          <div ref={subtitleRef} className="absolute top-8 right-8 text-right">
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING GREATER</h2>
            <h2 className="font-display font-bold text-4xl mb-2">SOMETHING UNKNOWN</h2>
            <p className="font-display text-xl">Yet so beautiful</p>
          </div>

          <div
            ref={moonContainerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div
              ref={containerRef}
              className="w-auto h-auto"
            />
          </div>

          <div ref={bottomLeftRef} className="absolute bottom-8 left-8">
            <h2 className="font-display font-bold text-5xl mb-2">Space</h2>
            <p className="font-display text-xl">Where imagination begins</p>
          </div>

          <div ref={bottomRightRef} className="absolute bottom-8 right-8 text-right">
            <h2 className="font-display font-bold text-6xl">DISCOVER MORE</h2>
          </div>

          <div
            ref={developerTextRef}
            className="absolute top-1/2 right-[10%] -translate-y-1/2 text-right opacity-0"
          >
            <h2 className="font-display font-bold text-7xl mb-6 leading-tight">
              DEEQUEY
            </h2>

            <h3 className="font-display font-bold text-5xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#FFFFFF] via-[#FF5A00] to-[#FF5A00]">
              Web Developer
            </h3>

            <p className="font-display text-2xl mb-3 max-w-md ml-auto">
              Pozwól się
            </p>

            <p className="font-display text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-500 to-blue-400">
              zaskoczyć
            </p>

            <div className="mt-8 space-y-2 text-lg">
              <p className="opacity-80">Frontend • Design • Experience</p>
              <p className="opacity-80">
                Projektuję strony, które nie tylko działają, <br />
                ale też budzą emocje i pozostają w pamięci.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 pointer-events-none">
        <div className="h-[350vh]"></div>
      </div>
    </>
  );
}
