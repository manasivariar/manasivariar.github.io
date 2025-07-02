import React, { useEffect, useState, useRef } from 'react';
import { GithubIcon, ExternalLinkIcon, XIcon, ArrowRightIcon, StarIcon, GitForkIcon, EyeIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import img1 from '/src/Images/Gun.png';
import img2 from '/src/Images/maze.png';
import img3 from '/src/Images/inpaint.png';
import img4 from '/src/Images/sign.png';
import img5 from '/src/Images/synapse.png';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const projectRefs = useRef([]);
  const modalRef = useRef(null);
  const projects = [{
    title: 'LLM Based Auto-Aiming and Tracking System',
    description: 'Developed a smart aiming system that tracks and points at objects based on a simple text prompt - kind of like giving a Nerf gun a brain. The project blends computer vision, robotics, and AI into a playful yet functional setup. While the concept is fun, it opens doors to serious applications in areas like surveillance, assistive tech, and interactive systems. It’s one of those projects where curiosity meets creativity - and something pretty cool comes out.',
    image: img1,
    tags: ['Computer Vision', 'CUDA', 'Python', 'Deep Learning'],
    github: null,
    demo: 'https://drive.google.com/file/d/1LDJ_pX0fTavVS55Yp95_PEtjJBiyDWwS/view?usp=drive_link',
    learnMore: 'https://drive.google.com/file/d/1dH7CZJPuYMSqnZSy5zFXAbI3-TjX-2br/view?usp=drive_link',
    details: "We built a smart aiming system that tracks and points at objects based on a simple text prompt - kind of like giving a Nerf gun a brain. The project blends computer vision, robotics, and AI into a playful yet functional setup. While the concept is fun, it opens doors to serious applications in areas like surveillance, assistive tech, and interactive systems. It’s one of those projects where curiosity meets creativity - and something pretty cool comes out.",
    category: 'robotics',
    stats: {
      stars: 124,
      forks: 37,
      views: 2580
    },
    features: ['Multimodal Visual Grounding with LLMs', 'Automated Aiming Mechanism', 'Temporal Tracking with CoTracker-3', 'Prompt-Based Target Selection']
  }, {
    title: 'Maze Detection & Path Planning – MyCobot Pro 600',
    description: 'This project involved programming the MyCobot Pro 600 robot to autonomously navigate a 4x4 printed maze using computer vision and inverse kinematics. By detecting ArUco markers, solving the maze path, and translating the solution into precise joint movements, the robot executed smooth and accurate navigation. The integration of Python, MATLAB, and real-world hardware control demonstrated a hands-on application of robotic planning and control. The project highlights a strong foundation in perception, planning, and execution in robotic systems.',
    image: img2,
    tags: ['MATLAB', 'Python', 'Control Systems', 'ROS'],
    github: 'https://github.com/manasivariar/Robot-Maze-Solver',
    demo: null,
    learnMore: 'src/Documents/RAS Project Report.pdf',
    details: 'This project involved programming the MyCobot Pro 600 robot to autonomously navigate a 4x4 printed maze using computer vision and inverse kinematics. By detecting ArUco markers, solving the maze path, and translating the solution into precise joint movements, the robot executed smooth and accurate navigation. The integration of Python, MATLAB, and real-world hardware control demonstrated a hands-on application of robotic planning and control. The project highlights a strong foundation in perception, planning, and execution in robotic systems.',
    category: 'robotics',
    stats: {
      stars: 87,
      forks: 19,
      views: 1450
    },
    features: ['ArUco Marker-Based Maze Detection', 'Autonomous Path Planning with BFS', 'Real-Time Visual Feedback Loop', 'Simulation-to-Reality Integration']
  }, {
    title: 'Real-Time Object Removal and Seamless Video Restoration',
    description: 'LiveInpaint is a real-time video inpainting system designed to remove unwanted objects from live video streams while preserving visual and temporal coherence. It integrates fast object segmentation with advanced inpainting techniques to deliver seamless video restoration. The system runs efficiently on consumer-grade hardware and adapts well to dynamic scenes. It’s especially useful in applications like live editing, privacy masking, and augmented reality content cleanup.',
    image: img3,
    tags: ['Reinforcement Learning', 'Python', 'TensorFlow', 'Multi-Agent Systems'],
    github: null,
    demo: null,
    learnMore: 'https://drive.google.com/file/d/1DpozVwh-_3DlLAVabMl6gIwn_2ck0sg2/view?usp=drive_link',
    details: 'LiveInpaint is a real-time video inpainting system designed to remove unwanted objects from live video streams while preserving visual and temporal coherence. It integrates fast object segmentation with advanced inpainting techniques to deliver seamless video restoration. The system runs efficiently on consumer-grade hardware and adapts well to dynamic scenes. It’s especially useful in applications like live editing, privacy masking, and augmented reality content cleanup.',
    category: 'AI',
    stats: {
      stars: 203,
      forks: 45,
      views: 3120
    },
    features: ['Real-Time Object Removal and Inpaint', 'Temporal Consistency Handling', 'Multi-Stage Inpainting Pipeline', 'Dynamic Frame Skipping Strategy']
  }, {
    title: 'Sign Language Translation System',
    description: 'This project focuses on bridging communication gaps for the hard-of-hearing and speech-impaired community by translating Indian Sign Language into text and vice versa in real time. It uses a vision-based approach with Convolutional Neural Networks to detect and classify hand gestures via webcam. The system also supports speech or text input and converts it into corresponding sign images, enabling two-way interaction. It was deployed as a simple, accessible web application using Streamlit.',
    image: img4,
    tags: ['Computer Vision', 'Human-Computer Interaction (HCI)', 'Computer Vision', 'Assistive Technology'],
    github: 'https://github.com/Ashwith25/Sign-language-translator',
    demo: null,
    learnMore: null,
    details: "This project focuses on bridging communication gaps for the hard-of-hearing and speech-impaired community by translating Indian Sign Language into text and vice versa in real time. It uses a vision-based approach with Convolutional Neural Networks to detect and classify hand gestures via webcam. The system also supports speech or text input and converts it into corresponding sign images, enabling two-way interaction. It was deployed as a simple, accessible web application using Streamlit.",
    category: 'AI',
    stats: {
      stars: 156,
      forks: 28,
      views: 2340
    },
    features: ['Real-Time Gesture Recognition', 'Custom Gesture Dataset', 'Two-Way Communication Support', 'Lightweight Web Deployment']
  },  {
    title: 'Synapse: Multi-Agentic AI Tutor',
    description: 'Synapse is an intelligent AI tutor that teaches data science. It creates a personalized learning plan for you, shows you how to write faster code using NVIDIA GPUs, and then proves how much faster the code is by running a live speed test on ASU\'s supercomputer.',
    image: img5,
    tags: ['Retrieval-Augmented Generation (RAG)', 'Multi-Agent Systems', 'GPU-Accelerated Computing', 'Personalized Learning Systems'],
    github: 'https://github.com/manasivariar/Multi-Agentic-AI-Tutor-Hackathon',
    demo: 'https://drive.google.com/file/d/1kmp5KvXKu9-ASmtqxtiQazOUgmyq7hUY/view?usp=drive_link',
    learnMore: 'https://docs.google.com/presentation/d/e/2PACX-1vSnaaQRZ0rmCiJe3RPSN1SSvzvATXrug9C985RahRXx7ELO3TnTjZgFGzW3q6DdKhL48Pp91A-oFY8C/pub?start=true&loop=true&delayms=3000',
    details: "Synapse is an intelligent AI tutor that teaches data science. It creates a personalized learning plan for you, shows you how to write faster code using NVIDIA GPUs, and then proves how much faster the code is by running a live speed test on ASU's supercomputer.",
    category: 'Hackathon',
    stats: {
      stars: 156,
      forks: 28,
      views: 2340
    },
    features: ['Sophisticated Multi-Agent Architecture', 'Live, Parallel Benchmarking of CPU vs GPU', 'Personalized & Persona-Driven Tutoring', 'The "NVIDIA-First" Directive']
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
  // detect touch‐only devices (no real hover)
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mql.addEventListener
      ? mql.addEventListener('change', handler)
      : mql.addListener(handler);
    return () => {
      mql.removeEventListener
        ? mql.removeEventListener('change', handler)
        : mql.removeListener(handler);
    };
  }, []);
  return (
    <section id="projects" className="md:scroll-mt-[-4rem] py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-8 font-mono animate-fade-in-up">
          Featured <span className="text-indigo-400">Projects</span>
        </h2>
        {/* Category filter tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {['all', 'robotics', 'AI', 'Hackathon'].map(category => <button key={category} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === category ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`} onClick={() => {
          setActiveTab(category);
          setVisibleProjects([]);
        }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>)}
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => openProjectDetails(project)}
              {...(!isTouch && {
                onMouseEnter: () => setHoveredProject(index),
                onMouseLeave: () => setHoveredProject(null)
              })}
              className={`
                 magnetic-wrap
                 relative
                 overflow-hidden
                 rounded-lg
                 bg-gray-800
                 shadow-lg
                 transform
                 transition-all
                 duration-700
                 cursor-pointer
                 ${visibleProjects.includes(index)
                   ? 'opacity-100 translate-y-0'
                   : 'opacity-0 translate-y-10'}
                 ${!isTouch ? 'group hover-lift' : ''}
                ${activeTab === 'all' && index === filteredProjects.length - 1
                  ? 'md:col-span-2 md:w-1/2 md:justify-self-center'
                  : ''}
               `}
            >
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
                        {/* <StarIcon size={14} className="text-yellow-400 mr-1" /> */}
                        {/* <span>{project.stats.stars}</span> */}
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        {/* <GitForkIcon size={14} className="text-indigo-400 mr-1" /> */}
                        {/* <span>{project.stats.forks}</span> */}
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        {/* <EyeIcon size={14} className="text-green-400 mr-1" /> */}
                        {/* <span>{project.stats.views}</span> */}
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
              {/* View details button - bottom right on hover */}
              <div className={`absolute bottom-4 right-4 transition-all duration-300 ${hoveredProject === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="bg-indigo-600/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  <span className="text-white text-sm font-medium mr-2">
                    View Details
                  </span>
                  <ArrowRightIcon size={16} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Project Details Modal */}
      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-auto animate-fade-in"
            onClick={closeProjectDetails}
          >
            <div
              ref={modalRef}
              className="project-modal-content relative bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-700 animate-scale-in"
              onClick={e => e.stopPropagation()} // ← prevent backdrop click inside
            >
              {/* close button */}
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <XIcon size={20} className="text-white" />
              </button>
              <div className="relative h-64">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
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
                  {/* <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <div className="flex justify-center mb-1">
                      <StarIcon size={18} className="text-yellow-400" />
                    </div>
                    <div className="text-xl font-bold text-white">
                      {selectedProject.stats.stars}
                    </div>
                    <div className="text-xs text-gray-400">GitHub Stars</div>
                  </div> */}
                  {/* <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <div className="flex justify-center mb-1">
                      <GitForkIcon size={18} className="text-indigo-400" />
                    </div>
                    <div className="text-xl font-bold text-white">
                      {selectedProject.stats.forks}
                    </div>
                    <div className="text-xs text-gray-400">Forks</div>
                  </div> */}
                  {/* <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <div className="flex justify-center mb-1">
                      <EyeIcon size={18} className="text-green-400" />
                    </div>
                    <div className="text-xl font-bold text-white">
                      {selectedProject.stats.views}
                    </div>
                    <div className="text-xs text-gray-400">Views</div>
                  </div> */}
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
                      Demo
                    </a>}
                  {selectedProject.learnMore && <a href={selectedProject.learnMore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                      <ExternalLinkIcon size={18} className="mr-2" />
                      Learn More
                    </a>}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
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
    </section>
  );
};

export default ProjectsSection;