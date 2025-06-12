import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, CodeIcon, BrainIcon, ServerIcon, TerminalIcon } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';
const HeroSection = () => {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const orb4Ref = useRef(null);
  const orb5Ref = useRef(null);
  const containerRef = useRef(null);
  // 1) Typewriter data & state
  const roles = ['Engineer', 'Researcher', 'Tinkerer', 'Dreamer'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');
  // 2) Typewriter effect
  useEffect(() => {
    const full = roles[currentRoleIndex];
    if (roleText.length < full.length) {
      const t = setTimeout(() => {
        setRoleText(full.slice(0, roleText.length + 1));
      }, 150);
      return () => clearTimeout(t);
    }
    const p = setTimeout(() => {
      setRoleText('');
      setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
    }, 2000);
    return () => clearTimeout(p);
  }, [roleText, currentRoleIndex]);
  useEffect(() => {
    const animate = () => {
      if (!orb1Ref.current || !orb2Ref.current || !orb3Ref.current || !orb4Ref.current || !orb5Ref.current) return;
      // Get current time for animation
      const time = Date.now() / 1000;
      // Calculate positions with different speeds and directions (slightly increased speed)
      const x1 = Math.sin(time * 0.25) * 50;
      const y1 = Math.cos(time * 0.35) * 40;
      const x2 = Math.sin(time * 0.35 + 2) * 60;
      const y2 = Math.cos(time * 0.25 + 1) * 50;
      const x3 = Math.sin(time * 0.2 + 3) * 70;
      const y3 = Math.cos(time * 0.3 + 2) * 60;
      // New orbs with different movement patterns
      const x4 = Math.sin(time * 0.4 + 1.5) * 45;
      const y4 = Math.cos(time * 0.3 + 0.5) * 55;
      const x5 = Math.sin(time * 0.15 + 4) * 65;
      const y5 = Math.cos(time * 0.25 + 3) * 45;
      // Apply transforms
      orb1Ref.current.style.transform = `translate(${x1}px, ${y1}px)`;
      orb2Ref.current.style.transform = `translate(${x2}px, ${y2}px)`;
      orb3Ref.current.style.transform = `translate(${x3}px, ${y3}px)`;
      orb4Ref.current.style.transform = `translate(${x4}px, ${y4}px)`;
      orb5Ref.current.style.transform = `translate(${x5}px, ${y5}px)`;
      // Continue animation
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    // Add mouse parallax effect
    const handleMouseMove = e => {
      if (!containerRef.current) return;
      const {
        clientX,
        clientY
      } = e;
      const {
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to center of container
      const x = (clientX - width / 2) / 25;
      const y = (clientY - height / 2) / 25;
      // Apply subtle parallax to orbs
      if (orb1Ref.current) orb1Ref.current.style.marginLeft = `${-x * 1.5}px`;
      if (orb1Ref.current) orb1Ref.current.style.marginTop = `${-y * 1.5}px`;
      if (orb2Ref.current) orb2Ref.current.style.marginLeft = `${x * 1}px`;
      if (orb2Ref.current) orb2Ref.current.style.marginTop = `${y * 1}px`;
      if (orb3Ref.current) orb3Ref.current.style.marginLeft = `${-x * 0.5}px`;
      if (orb3Ref.current) orb3Ref.current.style.marginTop = `${-y * 0.5}px`;
      if (orb4Ref.current) orb4Ref.current.style.marginLeft = `${x * 2}px`;
      if (orb4Ref.current) orb4Ref.current.style.marginTop = `${y * 2}px`;
      if (orb5Ref.current) orb5Ref.current.style.marginLeft = `${-x * 1.2}px`;
      if (orb5Ref.current) orb5Ref.current.style.marginTop = `${-y * 1.2}px`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" ref={containerRef} className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div ref={orb1Ref} className="absolute top-20 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-indigo-600/20 blur-xl transition-transform duration-1000 ease-in-out"></div>
        <div ref={orb2Ref} className="absolute bottom-20 right-10 md:right-20 w-40 h-40 md:w-56 md:h-56 rounded-full bg-purple-600/20 blur-xl transition-transform duration-1000 ease-in-out"></div>
        <div ref={orb3Ref} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-600/10 blur-xl transition-transform duration-1000 ease-in-out"></div>
        {/* New orbs */}
        <div ref={orb4Ref} className="absolute top-1/4 right-1/4 w-24 h-24 md:w-40 md:h-40 rounded-full bg-cyan-600/15 blur-xl transition-transform duration-1000 ease-in-out"></div>
        <div ref={orb5Ref} className="absolute bottom-1/3 left-1/3 w-36 h-36 md:w-52 md:h-52 rounded-full bg-indigo-500/15 blur-xl transition-transform duration-1000 ease-in-out"></div>
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        {/* Animated code icons with parallax effect */}
        <div className="flex justify-center mb-8 space-x-6">
          <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg animate-float-slow parallax" data-speed="0.05">
            <CodeIcon size={32} className="text-indigo-400" />
          </div>
          <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg animate-float-medium parallax" data-speed="-0.08">
            <TerminalIcon size={32} className="text-indigo-400" />
          </div>
          <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg animate-float-fast parallax" data-speed="0.1">
            <BrainIcon size={32} className="text-indigo-400" />
          </div>
          <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg animate-float-medium parallax" data-speed="-0.06">
            <ServerIcon size={32} className="text-indigo-400" />
          </div>
        </div>
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-100 font-mono">
            Manasi Variar
          </h1>
          <h2 className="text-2xl md:text-4xl font-mono text-indigo-400 mt-2">
            &lt; [{roleText}] &gt;
            <span className="border-r-2 border-indigo-400 animate-pulse ml-1"></span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mt-2">
            "Where Algorithms Meet Autonomy."
          </p>
        </div>
        {/* Glowing button */}
        <button onClick={scrollToAbout} className="mt-8 glow-effect rounded-full p-3 bg-gray-800/50 hover:bg-gray-700/80 transition-colors animate-fade-in-up" style={{
        animationDelay: '0.8s'
      }}>
          <ChevronDownIcon size={24} className="text-indigo-400" />
        </button>
      </div>
      {/* Animated scroll indicator */}
      <ScrollIndicator targetId="about" />
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>;
};
export default HeroSection;