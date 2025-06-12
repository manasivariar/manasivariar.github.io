import React, { useEffect, useState, useRef } from 'react';
import { GithubIcon, ExternalLinkIcon, XIcon, ArrowRightIcon, StarIcon, GitForkIcon, EyeIcon } from 'lucide-react';
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const projectRefs = useRef([]);
  const modalRef = useRef(null);
  const projects = [{
    title: 'Autonomous Drone Navigation',
    description: 'Developed a vision-based navigation system for drones that can operate in GPS-denied environments',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=1000',
    tags: ['Computer Vision', 'ROS', 'Python', 'Deep Learning'],
    github: 'https://github.com',
    demo: 'https://example.com',
    details: "This project implemented a SLAM-based navigation system for quadcopter drones, enabling them to create maps of unknown environments and navigate through them autonomously. The system uses a combination of visual odometry and inertial measurement to estimate the drone's position and orientation in real-time.",
    category: 'robotics',
    stats: {
      stars: 124,
      forks: 37,
      views: 2580
    },
    features: ['Real-time 3D mapping', 'Obstacle detection and avoidance', 'Path planning optimization', 'Low-latency control system']
  }, {
    title: 'Robotic Arm for Medical Applications',
    description: 'Designed and programmed a 6-DOF robotic arm for assisting in minimally invasive surgical procedures',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1000',
    tags: ['C++', 'Control Systems', 'Medical Robotics', 'ROS'],
    github: 'https://github.com',
    demo: null,
    details: 'This collaborative project with medical professionals created a high-precision robotic arm capable of assisting surgeons in delicate procedures. The arm features sub-millimeter positioning accuracy, tremor filtering, and intuitive control interfaces. Safety features include force feedback, emergency stops, and redundant position verification.',
    category: 'medical',
    stats: {
      stars: 87,
      forks: 19,
      views: 1450
    },
    features: ['Sub-millimeter precision', 'Force-feedback control', 'Surgeon-friendly interface', 'Redundant safety systems']
  }, {
    title: 'Multi-Agent Reinforcement Learning for Swarm Robotics',
    description: 'Implemented a distributed RL algorithm for coordinating a swarm of robots in collective tasks',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Reinforcement Learning', 'Python', 'TensorFlow', 'Multi-Agent Systems'],
    github: 'https://github.com',
    demo: 'https://example.com',
    details: 'This research project explored how multiple simple robots can learn to collaborate on complex tasks without centralized control. The system used a novel multi-agent reinforcement learning approach where each robot maintained its own policy but learned to coordinate implicitly through shared experiences and environmental feedback.',
    category: 'ai',
    stats: {
      stars: 203,
      forks: 45,
      views: 3120
    },
    features: ['Distributed learning algorithm', 'Emergent collaborative behaviors', 'Scalable to 100+ agents', 'Fault-tolerant operation']
  }, {
    title: 'Smart Prosthetic Hand',
    description: 'Created an AI-powered prosthetic hand that can recognize user intent from muscle signals',
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=1000',
    tags: ['EMG Processing', 'Machine Learning', 'Embedded Systems', 'C++'],
    github: 'https://github.com',
    demo: null,
    details: "This project developed a prosthetic hand that uses machine learning to interpret electromyography (EMG) signals from the user's residual muscles. The system can recognize different intended grip patterns and adapt to the user's specific muscle activation patterns over time, providing a more intuitive control experience than traditional prosthetics.",
    category: 'medical',
    stats: {
      stars: 156,
      forks: 28,
      views: 2340
    },
    features: ['Adaptive grip patterns', 'Personalized signal processing', 'Low-power operation', 'Durable mechanical design']
  }];
  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' ? projects : projects.filter(project => project.category === activeTab);
  useEffect(() => {
    // Setup intersection observer to detect when projects come into view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && !visibleProjects.includes(index)) {
            setVisibleProjects(prev => [...prev, index]);
          }
        }
      });
    }, {
      threshold: 0.2
    });
    // Reset project refs when filtering
    projectRefs.current = projectRefs.current.slice(0, filteredProjects.length);
    // Observe all project elements
    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [visibleProjects, filteredProjects]);
  // Add magnetic effect to project cards
  useEffect(() => {
    const handleMouseMove = (e, index) => {
      const card = projectRefs.current[index];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      // Apply magnetic effect
      card.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
    };
    const handleMouseLeave = index => {
      const card = projectRefs.current[index];
      if (!card) return;
      card.style.transform = 'translate(0px, 0px) scale(1)';
    };
    // Add event listeners to each project card
    projectRefs.current.forEach((card, index) => {
      if (!card) return;
      card.addEventListener('mousemove', e => handleMouseMove(e, index));
      card.addEventListener('mouseleave', () => handleMouseLeave(index));
    });
    return () => {
      projectRefs.current.forEach((card, index) => {
        if (!card) return;
        card.removeEventListener('mousemove', e => handleMouseMove(e, index));
        card.removeEventListener('mouseleave', () => handleMouseLeave(index));
      });
    };
  }, [filteredProjects]);
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeProjectDetails();
      }
    };
    if (selectedProject) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProject]);
  const openProjectDetails = project => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  const closeProjectDetails = () => {
    // Add a closing animation class
    const modalElement = document.querySelector('.project-modal-content');
    if (modalElement) {
      modalElement.classList.add('animate-fade-out');
      // Wait for animation to complete before removing
      setTimeout(() => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
      }, 300);
    } else {
      setSelectedProject(null);
      document.body.style.overflow = 'auto';
    }
  };
  return <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-8 font-mono animate-fade-in-up">
          Featured <span className="text-indigo-400">Projects</span>
        </h2>
        {/* Category filter tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {['all', 'robotics', 'ai', 'medical'].map(category => <button key={category} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === category ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`} onClick={() => {
          setActiveTab(category);
          setVisibleProjects([]);
        }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>)}
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => <div key={index} className={`magnetic-wrap group relative hover-lift cursor-pointer transform transition-all duration-700 ${visibleProjects.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
          transitionDelay: `${index * 150}ms`
        }} ref={el => projectRefs.current[index] = el} onMouseEnter={() => setHoveredProject(index)} onMouseLeave={() => setHoveredProject(null)} onClick={() => openProjectDetails(project)}>
              <div className="magnetic-area aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                <div className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out transform group-hover:scale-110" style={{
              backgroundImage: `url(${project.image})`
            }}>
                  <div className="w-full h-full bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2 transform translate-y-0 opacity-100 transition-all duration-300 group-hover:translate-y-0 font-mono">
                      {project.title}
                    </h3>
                    {/* Project stats - visible on hover */}
                    <div className={`flex gap-4 mb-3 transition-all duration-300 ease-in-out ${hoveredProject === index ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      <div className="flex items-center text-xs text-gray-300">
                        <StarIcon size={14} className="text-yellow-400 mr-1" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <GitForkIcon size={14} className="text-indigo-400 mr-1" />
                        <span>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <EyeIcon size={14} className="text-green-400 mr-1" />
                        <span>{project.stats.views}</span>
                      </div>
                    </div>
                    {/* Tags - visible on hover */}
                    <div className={`flex flex-wrap gap-2 mb-3 transition-all duration-500 ease-in-out ${hoveredProject === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {project.tags.slice(0, 3).map((tag, idx) => <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded-full backdrop-blur-sm">
                          {tag}
                        </span>)}
                      {project.tags.length > 3 && <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded-full backdrop-blur-sm">
                          +{project.tags.length - 3}
                        </span>}
                    </div>
                    {/* Description - visible on hover */}
                    <p className={`text-gray-300 mb-4 transition-all duration-500 ease-in-out ${hoveredProject === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {project.description.length > 80 ? project.description.substring(0, 80) + '...' : project.description}
                    </p>
                    {/* Links - visible on hover */}
                    <div className={`flex space-x-4 transition-all duration-500 ease-in-out ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                          <GithubIcon size={18} />
                        </a>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                          <ExternalLinkIcon size={18} />
                        </a>}
                    </div>
                  </div>
                </div>
              </div>
              {/* Hover indicator */}
              <div className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-500 ease-out ${hoveredProject === index ? 'w-full' : 'w-0'}`}></div>
              {/* View details button - appears on hover */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${hoveredProject === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="bg-indigo-600/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  <span className="text-white text-sm font-medium mr-2">
                    View Details
                  </span>
                  <ArrowRightIcon size={16} className="text-white" />
                </div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Project Details Modal */}
      {selectedProject && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div ref={modalRef} className="project-modal-content bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="relative h-64">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button onClick={closeProjectDetails} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors">
                <XIcon size={20} className="text-white" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                {selectedProject.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, idx) => <span key={idx} className="px-3 py-1 bg-indigo-900/50 text-indigo-300 text-sm font-medium rounded-full">
                    {tag}
                  </span>)}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedProject.details}
              </p>
              {/* Project stats with visual indicators */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="flex justify-center mb-1">
                    <StarIcon size={18} className="text-yellow-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {selectedProject.stats.stars}
                  </div>
                  <div className="text-xs text-gray-400">GitHub Stars</div>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="flex justify-center mb-1">
                    <GitForkIcon size={18} className="text-indigo-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {selectedProject.stats.forks}
                  </div>
                  <div className="text-xs text-gray-400">Forks</div>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="flex justify-center mb-1">
                    <EyeIcon size={18} className="text-green-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {selectedProject.stats.views}
                  </div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
              </div>
              {/* Key features */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Key Features
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, idx) => <li key={idx} className="flex items-center text-gray-300">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full mr-2"></div>
                      {feature}
                    </li>)}
                </ul>
              </div>
              <div className="flex space-x-4">
                {selectedProject.github && <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors">
                    <GithubIcon size={18} className="mr-2" />
                    View Code
                  </a>}
                {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                    <ExternalLinkIcon size={18} className="mr-2" />
                    Live Demo
                  </a>}
              </div>
            </div>
          </div>
        </div>}
      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        .animate-fade-out {
          animation: fadeOut 0.3s ease forwards;
        }
      `}</style>
    </section>;
};
export default ProjectsSection;