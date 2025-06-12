import React from 'react';
import { DownloadIcon, BookOpenIcon, AwardIcon, BriefcaseIcon } from 'lucide-react';
const ResumeSection = () => {
  const education = [{
    degree: 'M.S. in Robotics & Artificial Intelligence',
    institution: 'Arizona State University',
    period: '2024-2026',
    description: 'Specialized in reinforcement learning for robotic manipulation'
  }, {
    degree: 'B.E. in Computer Science',
    institution: 'University of Mumbai',
    period: '2018-2022',
    description: 'Focus on artificial intelligence and machine learning'
  },];
  const certifications = ['TensorFlow Developer Certification', 'ROS Developer Certification', 'AWS Certified Machine Learning Specialist', 'NVIDIA Deep Learning Institute Certificate'];
  const skills = ['Programming: Python, C++, MATLAB, JavaScript', 'Frameworks: TensorFlow, PyTorch, ROS, OpenCV', 'Tools: Git, Docker, Linux, AWS', 'Areas: Computer Vision, Machine Learning, Control Systems, SLAM'];
  return <section id="resume" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-12">
          Resume & <span className="text-indigo-400">Skills</span>
        </h2>
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <a
            href="src\Documents\Resume2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg inline-flex items-center transition-colors"
          >
            <DownloadIcon size={20} className="mr-2" />
            Download Full Resume
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center mb-6">
              <BookOpenIcon size={24} className="text-indigo-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-100">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((item, index) => <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-700">
                  <h4 className="text-lg font-semibold text-indigo-400">
                    {item.degree}
                  </h4>
                  <p className="text-gray-200">{item.institution}</p>
                  <p className="text-gray-400 text-sm mb-2">{item.period}</p>
                  <p className="text-gray-300">{item.description}</p>
                </div>)}
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center mb-6">
                <AwardIcon size={24} className="text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-100">
                  Certifications
                </h3>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg shadow-sm mb-8 border border-gray-700">
                <ul className="space-y-2">
                  {certifications.map((cert, index) => <li key={index} className="text-gray-300 flex items-center">
                      <span className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></span>
                      {cert}
                    </li>)}
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <BriefcaseIcon size={24} className="text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-100">
                  Technical Skills
                </h3>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-700">
                <ul className="space-y-3">
                  {skills.map((skill, index) => <li key={index} className="text-gray-300">
                      <div className="font-medium text-gray-100">
                        {skill.split(':')[0]}:
                      </div>
                      <div className="text-gray-300">{skill.split(':')[1]}</div>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ResumeSection;