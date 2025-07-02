import React, { useState } from 'react';
import { DownloadIcon, BookOpenIcon, AwardIcon, BriefcaseIcon } from 'lucide-react';
import myDocument1 from '/src/Documents/Resume2025.pdf'; // Adjust the path as needed
import myDocument2 from '/src/Documents/Resume-2025-Data Eng.pdf';

// University logos
import asuLogo from '/src/Images/ASU-logo.png';
import muLogo from '/src/Images/mumbai.png';

const ResumeSection = () => {
  const education = [{
    degree: 'M.S. in Robotics & Artificial Intelligence',
    institution: 'Arizona State University, United States',
    period: '2024-2026',
    description: 'Specialized in research & development of AI algorithms for robotics applications'
  }, {
    degree: 'B.E. in Computer Science',
    institution: 'University of Mumbai, India',
    period: '2018-2022',
    description: 'Focus on software development, artificial intelligence and machine learning'
  },];
  const certifications = ['HackerRank SQL Gold Badge', 'Certified in SQL (Advanced)', 'MATLAB for Data Processing and Visualization', 'MATLAB Programming Techniques'];

  // 1) Categorized skill lists
  const aiSkills = [
    'Frameworks: TensorFlow, PyTorch, ROS, OpenCV, Keras, NumPy, Scikit-learn',
    'Tools: Jupyter Notebook, MATLAB, Git, Linux, CUDA/cuDNN, Hugging Face',
    'Areas: Computer Vision, Machine Learning, Artificial Intelligence, Robotics, Multi-Agent Systems, GPU Acceleration, Natural Language Processing, Exploratory Data Analysis',
    'Soft Skills: Research & Experimentation, Problem Solving, Collaboration, Communication'
  ];
  const sdeSkills = [
    'Programming: Python, SQL, C++, React, JavaScript',
    'Tools: Git, Docker, Linux, AWS',
    'Databases/Big Data: PySpark, Hadoop, Oracle Database, MongoDB',
    'Analytics & Visualization: Tableau, Power BI, Google Data Studio, Jupyter Notebook, Excel (Pivot Tables, VBA, Charts), Plotly',
    'Soft Skills: Problem Solving, Team Collaboration, Strong Communication, Adaptability'
  ];
  const [activeSkillTab, setActiveSkillTab] = useState<'ai' | 'sde'>('ai');

  return (
    <section id="resume" className="md:scroll-mt-[-4rem] py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
          Resume & <span className="text-indigo-400">Skills</span>
        </h2>

        {/* ─── Education ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            {/* ASU logo */}
            {/* <img
              src={asuLogo}
              alt="Arizona State University logo"
              className="absolute top-4 right-4 w-16 h-16 object-contain"
            /> */}
            <h4 className="text-lg font-semibold text-indigo-400">{education[0].degree}</h4>
            <p className="text-gray-200">{education[0].institution}</p>
            <p className="text-gray-400 text-sm mb-2">{education[0].period}</p>
            <p className="text-gray-300">{education[0].description}</p>
            <p className="text-gray-300 italic text-sm">
              GPA: 4.00 / 4.00
            </p>
          </div>
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            {/* MU logo */}
            {/* <img
              src={muLogo}
              alt="University of Mumbai logo"
              className="absolute top-4 right-4 w-12 h-12 object-contain"
            /> */}
            <h4 className="text-lg font-semibold text-indigo-400">{education[1].degree}</h4>
            <p className="text-gray-200">{education[1].institution}</p>
            <p className="text-gray-400 text-sm mb-2">{education[1].period}</p>
            <p className="text-gray-300">{education[1].description}</p>
            <p className="text-gray-300 italic text-sm">
              GPA: 9.14 / 10.00
            </p>
          </div>
        </div>

        {/* ─── Technical Skills ─── */}
        <div>
          {/* Technical Skills Heading (logo + text) */}
          <div className="flex items-center mb-6">
            <BriefcaseIcon size={24} className="text-indigo-400 mr-3" />
            <h3 className="text-2xl font-semibold text-gray-100">Technical Skills</h3>
          </div>

          {/* skills box WITH filter tabs inside */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 flex flex-col">
            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveSkillTab('ai')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeSkillTab === 'ai'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                AI/ML
              </button>
              <button
                onClick={() => setActiveSkillTab('sde')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeSkillTab === 'sde'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                SDE/Data
              </button>
            </div>

            {/* ─── Skills List ─── */}
            <ul
              key={activeSkillTab}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 flex-1 mb-6 animate-slide-in"
            >
              {(activeSkillTab === 'ai' ? aiSkills : sdeSkills).map((skill, i) => (
                <li key={i} className="flex items-start">
                  <div className="mt-2 h-2 w-2 bg-indigo-400 rounded-full flex-shrink-0 mr-2" />
                  <p className="leading-snug">{skill}</p>
                </li>
              ))}
            </ul>
            {/* ─── Download Button per active filter ─── */}
            <div className="pt-4 border-t border-gray-700 text-center">
              {activeSkillTab === 'ai' ? (
                <a
                  href={myDocument1}
                  download
                  className="inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                >
                  <DownloadIcon size={18} className="mr-2" />
                  Download Resume - AI/ML
                </a>
              ) : (
                <a
                  href={myDocument2}
                  download
                  className="inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                >
                  <DownloadIcon size={18} className="mr-2" />
                  Download Resume - SDE/Data
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ─── Certifications ─── */}
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <AwardIcon size={24} className="text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold text-gray-100">Certifications</h3>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <ul className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-gray-300">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mt-2 h-2 w-2 bg-indigo-400 rounded-full flex-shrink-0 mr-2" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResumeSection;