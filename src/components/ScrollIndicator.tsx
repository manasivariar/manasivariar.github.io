import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
const ScrollIndicator = ({
  targetId
}) => {
  const scrollToTarget = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="scroll-down-indicator" onClick={scrollToTarget}>
      <div className="scroll-down-circles">
        <div className="scroll-down-circle"></div>
        <div className="scroll-down-circle"></div>
        <div className="scroll-down-circle"></div>
      </div>
      <ChevronDownIcon size={24} className="text-indigo-400 mt-2 animate-bounce" style={{
      animationDuration: '2s'
    }} />
    </div>;
};
export default ScrollIndicator;