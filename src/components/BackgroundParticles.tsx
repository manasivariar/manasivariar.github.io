import React, { useEffect, useState, useRef } from 'react';
const BackgroundParticles = ({
  count = 30
}) => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [scrollY, setScrollY] = useState(0);
  const requestRef = useRef();
  const containerRef = useRef(null);
  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({
      length: count
    }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: getRandomColor(),
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1
    }));
    setParticles(initialParticles);
    const handleMouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY + window.scrollY
      });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, [count]);
  useEffect(() => {
    // Animation loop
    const animate = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      setParticles(prevParticles => prevParticles.map(particle => {
        // Update position
        let x = particle.x + particle.vx;
        let y = particle.y + particle.vy;
        // Bounce off edges
        if (x < 0 || x > 100) particle.vx *= -1;
        if (y < 0 || y > 100) particle.vy *= -1;
        // Keep within bounds
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        // Calculate distance to mouse for interaction
        const particleAbsX = particle.x / 100 * containerWidth;
        const particleAbsY = particle.y / 100 * containerHeight + scrollY;
        const dx = mousePosition.x - particleAbsX;
        const dy = mousePosition.y - particleAbsY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Interactive radius
        const radius = 150;
        // If mouse is close, particles move away slightly
        if (distance < radius) {
          const angle = Math.atan2(dy, dx);
          const force = (radius - distance) / radius;
          // Apply repulsive force
          particle.vx -= Math.cos(angle) * force * 0.05;
          particle.vy -= Math.sin(angle) * force * 0.05;
        }
        // Add slight randomness to movement
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;
        // Apply damping to prevent excessive speed
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        return {
          ...particle,
          x,
          y
        };
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [mousePosition, scrollY]);
  function getRandomColor() {
    const colors = ['rgba(79, 70, 229, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(99, 102, 241, 0.6)' // indigo
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map(particle => <div key={particle.id} className="particle" style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      backgroundColor: particle.color,
      transform: `translate(-50%, -50%) scale(${1 + Math.abs(particle.vx + particle.vy)})`
    }} />)}
    </div>;
};
export default BackgroundParticles;