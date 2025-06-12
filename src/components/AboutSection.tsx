import React, { useEffect, useRef } from 'react';
import { CodeIcon, CpuIcon, BrainIcon, DatabaseIcon } from 'lucide-react';
const AboutSection = () => {
  // Reference for tilt effect
  const cardRefs = useRef([]);
  // Skill data with proficiency percentages
  const skills = [{
    icon: <CodeIcon size={24} />,
    label: 'Python, C++, ROS',
    proficiency: 90,
    description: 'Expert in robotics programming languages and frameworks'
  }, {
    icon: <CpuIcon size={24} />,
    label: 'Hardware Integration',
    proficiency: 85,
    description: 'Specialized in connecting software with physical components'
  }, {
    icon: <BrainIcon size={24} />,
    label: 'Machine Learning',
    proficiency: 80,
    description: 'Deep learning for computer vision and decision-making'
  }, {
    icon: <DatabaseIcon size={24} />,
    label: 'Data Analysis',
    proficiency: 75,
    description: 'Processing and interpreting sensor data for insights'
  }];
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
  return <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-12">
          About <span className="text-indigo-400">Me</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-300 mb-8 leading-relaxed animate-slide-left">
            I'm a passionate Robotics Software Engineer with a deep fascination
            for the intersection of AI and physical systems. My journey began
            with building simple robots in my garage and evolved into developing
            sophisticated algorithms for autonomous navigation and
            decision-making.
          </p>
          <p className="text-lg text-gray-300 mb-12 leading-relaxed animate-slide-right">
            With expertise spanning both software development and robotics
            engineering, I bring a unique perspective to creating intelligent
            systems that can perceive, learn, and interact with the world. I'm
            driven by the belief that robotics has the potential to solve some
            of humanity's most pressing challenges.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => <div key={index} ref={el => cardRefs.current[index] = el} className="interactive-card flex flex-col items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="card-content w-full">
                  <div className="text-indigo-400 mb-2 card-icon">
                    {skill.icon}
                  </div>
                  <p className="text-gray-200 text-center font-medium">
                    {skill.label}
                  </p>
                  {/* Skill percentage bar */}
                  <div className="mt-3 w-full bg-gray-600/50 rounded-full h-2">
                    <div className="stat-bar" data-percentage={skill.proficiency} style={{
                  '--percentage': `${skill.proficiency}%`
                }}></div>
                  </div>
                  {/* Tooltip with description - appears on hover */}
                  <div className="mt-2 text-xs text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.description}
                  </div>
                </div>
              </div>)}
          </div>
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-lg border border-indigo-900/20 animate-zoom">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 reveal-line">
              {/* I'm open for collaboration on exciting robotics projects! */}
              I'm open for below roles:
            </h3>
            <ul className="space-y-4">
              {[{
              fact: 'AI/ML Engineer',
              value: 14,
              label: 'Age'
            }, {
              fact: 'Robotics Software Engineer',
              value: 3,
              label: 'Frameworks'
            }, {
              fact: 'Software Development Engineer',
              value: 2,
              label: 'Conferences'
            }, {
              fact: 'Data Scientist/Data Analyst/Business Analyst',
              value: 5,
              label: 'Teams Mentored'
            }].map((item, idx) => <li key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-indigo-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    <span className="text-gray-300">{item.fact}</span>
                  </div>
                  {/* Animated number display */}
                  <div className="bg-indigo-900/30 px-3 py-1 rounded-full flex flex-col items-center min-w-[60px]">
                    <span className="text-indigo-300 font-bold">
                      {item.value}
                    </span>
                    <span className="text-gray-400 text-xs">{item.label}</span>
                  </div>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;