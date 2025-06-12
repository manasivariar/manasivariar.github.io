import React, { useEffect, useState, useRef } from 'react';
import { BriefcaseIcon, ArrowUpRightIcon, ChevronRightIcon } from 'lucide-react';
const ExperienceSection = () => {
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const experiences = [{
    role: 'Senior Robotics Engineer',
    company: 'Boston Dynamics',
    period: '2022 - Present',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Boston_Dynamics_logo.svg',
    responsibilities: ['Lead a team of 5 engineers developing perception algorithms for quadruped robots', 'Implemented real-time obstacle avoidance using deep reinforcement learning', 'Reduced computation requirements by 40% while maintaining performance'],
    technologies: ['ROS', 'C++', 'Python', 'PyTorch', 'CUDA'],
    skills: [{
      name: 'Team Leadership',
      level: 5
    }, {
      name: 'Algorithm Development',
      level: 5
    }, {
      name: 'System Optimization',
      level: 4
    }],
    impact: 'Increased robot navigation accuracy by 35% in complex environments'
  }, {
    role: 'Robotics Software Developer',
    company: 'Waymo',
    period: '2019 - 2022',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Waymo_logo.svg/512px-Waymo_logo.svg.png',
    responsibilities: ['Developed and optimized path planning algorithms for autonomous vehicles', 'Implemented sensor fusion techniques for improved environmental awareness', 'Contributed to the simulation framework for testing edge cases'],
    technologies: ['C++', 'Python', 'TensorFlow', 'CARLA', 'ROS'],
    skills: [{
      name: 'Path Planning',
      level: 5
    }, {
      name: 'Sensor Fusion',
      level: 4
    }, {
      name: 'Simulation',
      level: 4
    }],
    impact: 'Reduced decision-making latency by 28% in critical scenarios'
  }, {
    role: 'Research Intern',
    company: 'NASA JPL',
    period: 'Summer 2018',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/NASA_Jet_Propulsion_Laboratory_logo.svg/512px-NASA_Jet_Propulsion_Laboratory_logo.svg.png',
    responsibilities: ['Designed algorithms for autonomous navigation in GPS-denied environments', 'Implemented SLAM techniques for planetary rover prototypes', 'Published research findings in IEEE Robotics and Automation Letters'],
    technologies: ['MATLAB', 'Python', 'ROS', 'OpenCV'],
    skills: [{
      name: 'Research',
      level: 4
    }, {
      name: 'SLAM',
      level: 3
    }, {
      name: 'Technical Writing',
      level: 4
    }],
    impact: 'Algorithm adopted for future Mars rover navigation systems'
  }];
  useEffect(() => {
    // Animate timeline as user scrolls
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const windowHeight = window.innerHeight;
      // Calculate how far down the timeline we've scrolled
      // This creates a more responsive timeline that follows scroll position exactly
      let scrollPercentage = 0;
      if (timelineTop <= windowHeight && timelineTop + timelineHeight >= 0) {
        // Only calculate when timeline is visible
        const visibleHeight = Math.min(windowHeight, timelineTop + timelineHeight) - Math.max(0, timelineTop);
        const totalVisibleHeight = Math.min(timelineHeight, windowHeight);
        scrollPercentage = visibleHeight / totalVisibleHeight;
        // Adjust to make it more proportional to actual scroll progress
        scrollPercentage = (windowHeight - timelineTop) / (timelineHeight + windowHeight);
      } else if (timelineTop + timelineHeight < 0) {
        // Past the timeline
        scrollPercentage = 1;
      }
      // Clamp between 0 and 1
      const clampedScrollPercentage = Math.max(0, Math.min(1, scrollPercentage));
      setTimelineProgress(clampedScrollPercentage * 100);
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return <section id="experience" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-12">
          Work <span className="text-indigo-400">Experience</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div ref={timelineRef} className="relative">
            {/* Timeline line with animation */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-indigo-900/50 overflow-hidden">
              <div className="timeline-line absolute top-0 left-0 w-full bg-indigo-400" style={{
              height: `${timelineProgress}%`
            }}></div>
            </div>
            {/* Experience items */}
            {experiences.map((exp, index) => <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left'}`} style={{
            transitionDelay: `${index * 0.2}s`
          }}>
                {/* Timeline dot with pulsing animation */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -mt-2 w-5 h-5 rounded-full border-4 border-indigo-400 bg-gray-900 z-10 cursor-pointer hover:scale-125 transition-transform" onClick={() => toggleExpand(index)}>
                  {timelineProgress > index * 33 && <span className="absolute inset-0 rounded-full bg-indigo-400 transform scale-50 opacity-70"></span>}
                </div>
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                  <div className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 tilt-card ${expandedIndex === index ? 'ring-2 ring-indigo-500/50' : ''}`} onClick={() => toggleExpand(index)}>
                    <div className="flex justify-between items-start mb-4 tilt-content">
                      <div>
                        <h3 className="text-xl font-bold text-gray-100 reveal-line tilt-inner">
                          {exp.role}
                        </h3>
                        <p className="text-indigo-400 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-gray-400 text-sm">{exp.period}</p>
                      </div>
                      {exp.logo && <img src={exp.logo} alt={`${exp.company} logo`} className="h-10 w-auto object-contain" />}
                    </div>
                    {/* Responsibility bullets with animated entrance */}
                    <ul className="mb-4 space-y-2">
                      {exp.responsibilities.map((item, idx) => <li key={idx} className="text-gray-300 flex transform transition-transform duration-300 hover:translate-x-1" style={{
                    transitionDelay: `${idx * 0.1}s`
                  }}>
                          <ArrowUpRightIcon size={18} className="text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>)}
                    </ul>
                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, idx) => <span key={idx} className="px-3 py-1 bg-indigo-900/50 text-indigo-300 text-xs font-medium rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900/70">
                          {tech}
                        </span>)}
                    </div>
                    {/* Expanded details */}
                    <div className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-4 border-t border-gray-700 mt-4">
                        <h4 className="text-lg font-semibold text-indigo-300 mb-3">
                          Skills Applied
                        </h4>
                        {/* Skill bars */}
                        <div className="space-y-3">
                          {exp.skills.map((skill, idx) => <div key={idx}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">
                                  {skill.name}
                                </span>
                                <span className="text-gray-400">
                                  {skill.level}/5
                                </span>
                              </div>
                              <div className="skill-level">
                                {[...Array(5)].map((_, dotIdx) => <div key={dotIdx} className={`skill-dot ${dotIdx < skill.level ? 'active' : ''}`} style={{
                            transitionDelay: `${idx * 0.1 + dotIdx * 0.1}s`
                          }}></div>)}
                              </div>
                            </div>)}
                        </div>
                        {/* Impact statement */}
                        <div className="mt-4 bg-indigo-900/20 p-3 rounded border-l-4 border-indigo-500">
                          <h4 className="text-sm font-semibold text-indigo-300 mb-1">
                            Key Impact
                          </h4>
                          <p className="text-gray-300 text-sm">{exp.impact}</p>
                        </div>
                      </div>
                    </div>
                    {/* Expand/collapse indicator */}
                    <button className="mt-3 flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors" onClick={e => {
                  e.stopPropagation();
                  toggleExpand(index);
                }}>
                      {expandedIndex === index ? 'Show less' : 'Show more'}
                      <ChevronRightIcon size={14} className={`ml-1 transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ExperienceSection;