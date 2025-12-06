import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SpinningGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create Earth Texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Ocean
    ctx.fillStyle = '#1a5f8f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Continents (simple shapes)
    ctx.fillStyle = '#3d8a3d';
    
    // North America
    ctx.fillRect(200, 300, 400, 300);
    
    // South America
    ctx.fillRect(400, 700, 250, 400);
    
    // Africa
    ctx.fillRect(900, 500, 350, 500);
    
    // Europe
    ctx.fillRect(900, 250, 200, 150);
    
    // Asia
    ctx.fillRect(1200, 200, 600, 450);
    
    // Australia
    ctx.fillRect(1500, 850, 250, 200);

    const texture = new THREE.CanvasTexture(canvas);

    // Globe
    const geometry = new THREE.SphereGeometry(1.5, 50, 50);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 20
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add wireframe for better visibility
    const wireframeGeometry = new THREE.SphereGeometry(1.51, 20, 20);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Add some stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5
    });

    const starsVertices = [];
    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      globe.rotation.y += 0.003;
      wireframe.rotation.y += 0.003;
      stars.rotation.y += 0.0002;
      
      renderer.render(scene, camera);
    }
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            TourSolo
          </h1>
          <p className="text-2xl text-gray-200 mb-8 drop-shadow-xl">
            Discover Your Next Adventure
          </p>
          <button className="pointer-events-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl">
            Explore Destinations
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-60">
        🌍 Travel the World Solo
      </div>
    </div>
  );
}