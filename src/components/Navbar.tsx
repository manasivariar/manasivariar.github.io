import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, LinkedinIcon, GithubIcon, TwitterIcon, MailIcon } from 'lucide-react';
import myImage from '/src/Images/me.jpg'; // Adjust the path as needed

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full md:w-64 h-auto md:h-screen z-50 flex flex-col justify-between" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
      {/* Avatar + Hamburger Row with same translucent bg as mobile menu */}
      <div className="flex items-center justify-between
                      px-4 py-4 bg-gray-900/90 backdrop-blur-sm shadow-md
                      md:bg-transparent md:backdrop-blur-none md:shadow-none
                      md:px-6 md:mt-8 md:flex-col md:justify-center">
        {/* avatar */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => { scrollToSection('home'); setMobileMenuOpen(false); }}
        >
          {/* small on mobile, full square on md+ */}
          <div className="w-12 h-12 md:hidden rounded-full overflow-hidden">
            <img
              src={myImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex aspect-square rounded-full overflow-hidden">
            <img
              src={myImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* hamburger toggle */}
        <button
          className="text-gray-300 md:hidden"
          onClick={() => setMobileMenuOpen(o => !o)}
        >
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile expanded nav under header */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-sm shadow-md px-6 pb-4 space-y-4">
          {['home','about','resume','experience','projects'].map(item => (
            <button
              key={item}
              onClick={() => { scrollToSection(item); setMobileMenuOpen(false); }}
              className="w-full text-center text-gray-300 hover:text-indigo-400 capitalize font-medium py-2"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Desktop links & socials */}
      <div className="flex-1 hidden md:flex flex-col justify-center items-center space-y-6">
        {['home', 'about', 'resume', 'experience', 'projects'].map(item => <button key={item} onClick={() => scrollToSection(item)} className="text-gray-300 hover:text-indigo-400 capitalize font-medium py-2 relative group">
            {item}
            <span className="absolute -left-2 top-1/2 h-0.5 w-0 bg-indigo-400 transition-all group-hover:w-2"></span>
          </button>)}
      </div>
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
    </nav>
  );
};
export default Navbar;