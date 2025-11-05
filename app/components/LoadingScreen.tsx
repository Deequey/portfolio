"use client";

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);

  useEffect(() => {
    const assets = [
      '/textures/moon.jpg',
    ];

    let loaded = 0;

    //ladowanie jednego asseta
    const loadAsset = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedAssets(loaded);
          setProgress((loaded / assets.length) * 100);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    //wszystskie assety
    Promise.all(assets.map(loadAsset))
      .then(() => {
        setTimeout(() => setIsLoading(false), 800);
      })
      .catch((error) => {
        console.error('Error loading assets:', error);
        //fallbnack - zamykanie loadera nawetg po bledzue
        setTimeout(() => setIsLoading(false), 1000);
      });
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-700 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-8">
        <h1 className="font-display font-bold text-6xl md:text-8xl">
          DEEQUEY
        </h1>
        <p className="font-sans text-lg md:text-2xl opacity-70">
            przeszukiwanie kosmosu...
        </p>
        
        <div className="w-64 md:w-96 mx-auto">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-display text-sm opacity-60">
            {Math.round(progress)}% • {loadedAssets}/{loadedAssets} przeszukanych gwiazd
          </p>
        </div>
      </div>
    </div>
  );
}
