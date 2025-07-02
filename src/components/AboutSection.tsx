import React, { useEffect, useRef } from 'react';
import { CodeIcon, CpuIcon, BrainIcon, DatabaseIcon } from 'lucide-react';
const AboutSection = () => {
  // Reference for tilt effect
  const cardRefs = useRef([]);
  // Skill data with proficiency percentages
  const skills = [{
    icon: <CodeIcon size={24} />,
    label: 'Python, Robotics',
    proficiency: 90,
    description: 'Expert in robotics programming languages and frameworks'
  }, {
    icon: <CpuIcon size={24} />,
    label: 'Competitive Programming',
    proficiency: 92,
    description: 'Specialized in connecting software with physical components'
  }, {
    icon: <BrainIcon size={24} />,
    label: 'Machine Learning, MATLAB',
    proficiency: 85,
    description: 'Deep learning for computer vision and decision-making'
  }, {
    icon: <DatabaseIcon size={24} />,
    label: 'Data Analysis',
    proficiency: 90,
    description: 'Processing and interpreting sensor data for insights'
  },];
  // Setup tilt effect
  useEffect(() => {
    const handleTilt = (e, index) => {
      const card = cardRefs.current[index];
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      // Calculate tilt based on mouse position
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      // Calculate percentage distance from center (-1 to 1)
      const tiltX = (cardCenterY - mouseY) / (cardRect.height / 2);
      const tiltY = (mouseX - cardCenterX) / (cardRect.width / 2);
      // Apply tilt with constraints
      const maxTilt = 10; // maximum tilt in degrees
      card.style.transform = `perspective(1000px) rotateX(${tiltX * maxTilt}deg) rotateY(${tiltY * maxTilt}deg)`;
      // Apply transform to inner elements
      const inner = card.querySelector('.card-inner');
      if (inner) {
        inner.style.transform = `translateZ(20px)`;
      }
    };
    const resetTilt = index => {
      const card = cardRefs.current[index];
      if (!card) return;
      // Reset to original position
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      const inner = card.querySelector('.card-inner');
      if (inner) {
        inner.style.transform = 'translateZ(0)';
      }
    };
    // Add event listeners to each card
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      card.addEventListener('mousemove', e => handleTilt(e, index));
      card.addEventListener('mouseleave', () => resetTilt(index));
    });
    return () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        card.removeEventListener('mousemove', e => handleTilt(e, index));
        card.removeEventListener('mouseleave', () => resetTilt(index));
      });
    };
  }, []);
  // Observer for skill bars animation
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.percentage + '%';
        }
      });
    }, {
      threshold: 0.2
    });
    document.querySelectorAll('.stat-bar').forEach(bar => {
      observer.observe(bar);
    });
    return () => observer.disconnect();
  }, []);
  return <section id="about" className="md:scroll-mt-[-4rem] py-20 bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-12">
          About <span className="text-indigo-400">Me</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-300 mb-8 leading-relaxed animate-slide-left">
            Hey there! - I'm <span className="text-indigo-400">Manasi</span>, a passionate and ever-curious Robotics Software Engineer and AI/ML enthusiast. My journey started in computer science, took me through the worlds of software development and data engineering, and now has me deep in the exciting space of Robotics and Artificial Intelligence as a Master’s student at Arizona State University.
          </p>
          <p className="text-lg text-gray-300 mb-12 leading-relaxed animate-slide-right">
            You could call me a <span className="italic">jack of all trades, master of none</span> (I know, risky to admit) - but that’s because I’ve been busy exploring by taking scenic route. I’ve worked on everything from simple competitive coding to building real-time systems with LLMs and microcontrollers. I’m still learning, but I’ve built a few things I’m proud of. Check out the Projects section to see what I’ve been experimenting with.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => <div key={index} ref={el => cardRefs.current[index] = el} className="interactive-card flex flex-col items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="card-content w-full">
                  <div className="text-indigo-400 mb-2 card-icon">
                    {skill.icon}
                  </div>
                  <div className='card-inner flex flex-col items-center py-4'>
                  <p className="md:min-h-[3rem] text-gray-200 text-center font-medium">
                    {skill.label}
                  </p>
                  </div>
                  {/* Skill percentage bar */}
                  <div className="mt-3 w-full bg-gray-600/50 rounded-full h-2">
                    <div className="stat-bar" data-percentage={skill.proficiency} style={{
                  '--percentage': `${skill.proficiency}%`
                }}></div>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-lg border border-indigo-900/20 animate-zoom">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 reveal-line">
              I'm open for below roles:
            </h3>
            <div className="grid grid-cols-[min-content,1fr] gap-x-4 gap-y-2 mb-4">
              {[
                'AI/ML Engineer',
                'Robotics Software Engineer',
                'Data Scientist/Data Analyst/Business Analyst',
                'Software Development Engineer'
              ].map((role, idx) => (
                <React.Fragment key={idx}>
                  {/* bullet cell */}
                  <span className="block h-1 w-1 bg-white rounded-full mt-2.5" />
                  {/* text cell */}
                  <span className="text-gray-300">{role}</span>
                </React.Fragment>
              ))}
            </div>
            {/* <ul className="list-disc list-inside space-y-2 text-gray-300">
              {[
                'AI/ML Engineer',
                'Robotics Software Engineer',
                'Software Development Engineer',
                'Data Scientist/Data Analyst/Business Analyst'
              ].map(role => (
                <li key={role}>{role}</li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;