import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';

import { Scene } from './components/Scene';
import { ProjectModal } from './components/ProjectModal';
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from './components/Icons';
import { PROJECTS, SOCIAL_LINKS, USER_PORTRAIT } from './constants';
import type { Project } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/50 to-black"></div>
      
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 p-4 md:p-8 flex items-center justify-center md:justify-start z-10"
      >
        <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl flex items-center gap-4 shadow-lg shadow-indigo-500/20">
          <img src={USER_PORTRAIT} alt="Saif Gnini" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-indigo-500 object-cover" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-orbitron text-cyan-300">Saif Gnini</h1>
            <p className="text-sm md:text-base text-gray-300">Web & Graphic Designer</p>
          </div>
        </div>
      </motion.header>

      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
          <Scene onSelectProject={handleSelectProject} />
        </Canvas>
      </Suspense>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-gray-400 text-xs md:text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none"
      >
        Click & Drag to explore the gallery
      </motion.div>

      <motion.footer 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex justify-center z-10"
      >
        <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full flex items-center gap-4 md:gap-6 shadow-lg shadow-indigo-500/20">
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
            <WhatsAppIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
            <InstagramIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
            <FacebookIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>
      </motion.footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Loader: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400 mx-auto"></div>
      <p className="mt-4 text-lg text-gray-300">Loading 3D Experience...</p>
    </div>
  </div>
);

export default App;