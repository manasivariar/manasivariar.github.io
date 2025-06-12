import React from 'react';
import { LinkedinIcon, GithubIcon, MailIcon, TwitterIcon } from 'lucide-react';
// 1) import your image asset
import footerLogo from '/src/Images/manasi-sign-removebg-preview.png';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* 2) replace text with image */}
          <img
            src={footerLogo}
            alt="Footer Logo"
            className="w-full max-w-xs h-auto mb-6 object-contain"
          />
          <div className="text-gray-400 text-center max-w-md">
            <p className="mb-4">
              "Building intelligent machines that can perceive, learn, and
              interact with the world is not just my profession—it's my
              passion."
            </p>
            <div className="text-sm">
              <p className="mb-1">jane.doe@example.com</p>
              <p>Built with React and ❤️</p>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Jane Doe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;