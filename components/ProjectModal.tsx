import React from 'react';
import { motion, Variants } from 'framer-motion';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const modalVariants: Variants = {
  hidden: { y: "50%", opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 25,
      mass: 1,
      when: "beforeChildren",
      staggerChildren: 0.1
    } 
  },
  exit: { 
    y: "50%", 
    opacity: 0,
    scale: 0.95,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};


export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-800/80 border border-gray-700 rounded-2xl shadow-2xl shadow-indigo-500/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
      >
        <motion.div variants={itemVariants} className="md:w-1/2 w-full flex-shrink-0">
          <img src={project.image} alt={project.title} className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
        </motion.div>
        <div className="p-6 md:p-8 flex flex-col">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold font-orbitron text-cyan-300 mb-4">{project.title}</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 mb-6 flex-grow">{project.description}</motion.p>
          <div>
            <motion.h3 variants={itemVariants} className="text-lg font-semibold text-gray-200 mb-3">Technologies Used:</motion.h3>
            <motion.div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <motion.span 
                  key={index} 
                  variants={itemVariants}
                  className="bg-indigo-500/30 text-indigo-200 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close project details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};