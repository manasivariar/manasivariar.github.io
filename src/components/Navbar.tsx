import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, LinkedinIcon, GithubIcon, TwitterIcon, MailIcon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };
  return <nav className="w-full md:fixed md:top-0 md:left-0 md:w-64 md:h-screen z-50 bg-gray-900/90 backdrop-blur-sm shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Profile image */}
      <div className="px-6 mt-8">
        <img src="src\Images\IMG_20240315_211141_410.jpg" alt="Profile" className="w-full aspect-square rounded-full object-cover" />
      </div>

      {/* Desktop nav links */}
      <div className="flex-1 hidden md:flex flex-col justify-center items-center space-y-6">
        {['home', 'about', 'resume', 'experience', 'projects'].map(item => <button key={item} onClick={() => scrollToSection(item)} className="text-gray-300 hover:text-indigo-400 capitalize font-medium py-2 relative group">
            {item}
            <span className="absolute -left-2 top-1/2 h-0.5 w-0 bg-indigo-400 transition-all group-hover:w-2"></span>
          </button>)}
      </div>

      {/* Social icons (only on md+) */}
      <div className="hidden md:flex flex-row items-center justify-center space-x-4 mb-8">
        <a
          href="https://www.linkedin.com/in/manasivariar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400"
        >
          <LinkedinIcon size={24} />
        </a>
        <a
          href="https://github.com/manasivariar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400"
        >
          <GithubIcon size={24} />
        </a>
        <a
          href="mailto:mrajanva@asu.edu?subject=Contact%20from%20Portfolio&body=Hi%20Manasi,"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400"
        >
          <MailIcon size={24} />
        </a>
      </div>

      {/* Mobile menu toggle */}
      <div className="px-6 py-4 md:hidden">
        <button className="text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && <div className="md:hidden bg-gray-900/95 backdrop-blur-sm absolute w-full shadow-md py-4">
          <div className="flex flex-col space-y-4 px-4">
            {['home', 'about', 'resume', 'experience', 'projects'].map(item => <button key={item} onClick={() => scrollToSection(item)} className="text-gray-300 hover:text-indigo-400 capitalize font-medium py-2">
                  {item}
                </button>)}
          </div>
        </div>}
    </nav>;
};
export default Navbar;