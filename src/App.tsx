import React, { useEffect, useRef, createElement } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ResumeSection from './components/ResumeSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import BackgroundParticles from './components/BackgroundParticles';
export function App() {
  const animatedElementsRef = useRef([]);
  useEffect(() => {
    // Add dark theme class to body
    document.body.classList.add('dark-theme');
    // Setup section visibility animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
        }
      });
    }, observerOptions);
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('section-transition', 'section-hidden');
      sectionObserver.observe(section);
    });
    // Setup element animations
    const elementObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });
    // Observe all animated elements
    document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-zoom, .reveal-line, .char-reveal').forEach(element => {
      elementObserver.observe(element);
      animatedElementsRef.current.push(element);
    });
    // Setup parallax effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.body.classList.remove('dark-theme');
      sectionObserver.disconnect();
      elementObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Setup text animation on mount
  useEffect(() => {
    // Split text for character animation
    document.querySelectorAll('.text-animate').forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char-reveal';
        span.style.transitionDelay = `${index * 0.03}s`;
        element.appendChild(span);
      });
    });
  }, []);
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-100 overflow-hidden flex flex-col">
      <CustomCursor />
      <ScrollProgressIndicator />
      <BackgroundParticles count={20} />

      {/* stack on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto md:ml-64 p-4">
          <HeroSection />
          <AboutSection />
          <ResumeSection />
          <ExperienceSection />
          <ProjectsSection />
        </main>
      </div>

      {/* footer always at end, full-width */}
      <Footer />
    </div>
  );
}