
import React, { useRef, useState } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Image, Text } from '@react-three/drei';
import * as THREE from 'three';

import { PROJECTS } from '../constants';
import type { Project } from '../types';

const GOLDEN_RATIO = 1.618;
const SPACING = 3.5;
const SPECIAL_PROJECT_Z = -1;

type ProjectExhibitProps = ThreeElements['group'] & {
  project: Project;
  onSelectProject: (project: Project) => void;
};

const ProjectExhibit: React.FC<ProjectExhibitProps> = ({ project, onSelectProject, ...props }) => {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (ref.current && props.position && Array.isArray(props.position)) {
      // Animate position on hover
      const targetY = hovered ? props.position[1] + 0.2 : props.position[1];
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);

      // Animate scale on hover and click for a 'pop' effect
      const targetScale = clicked ? 1.25 : (hovered ? 1.15 : 1);
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Animate rotation on hover for more dynamism
      const targetRotationY = hovered ? -0.1 : 0;
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.1);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelectProject(project);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };
  
  const imageWidth = project.isSpecial ? 3 : 2;

  return (
    <group 
      ref={ref} 
      {...props} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <Image
        url={project.image}
        scale={[imageWidth, imageWidth / GOLDEN_RATIO, 1]}
        side={THREE.DoubleSide}
      >
        <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={hovered ? 0.3 : 0}
            toneMapped={false}
         />
      </Image>
       <Text
        position={[0, - (imageWidth / GOLDEN_RATIO / 2) - 0.3, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="top"
      >
        {project.title}
      </Text>
    </group>
  );
};


interface SceneProps {
  onSelectProject: (project: Project) => void;
}

export const Scene: React.FC<SceneProps> = ({ onSelectProject }) => {
  const otherProjects = PROJECTS.filter(p => !p.isSpecial);
  const specialProject = PROJECTS.find(p => p.isSpecial);
  const totalOtherProjects = otherProjects.length;

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 2, 5]} intensity={1.5} color="#6e44ff" />
      <pointLight position={[0, -2, -5]} intensity={1.5} color="#00ffff" />

      <group>
        {specialProject && (
          <ProjectExhibit
            key={specialProject.id}
            project={specialProject}
            position={[0, 0, SPECIAL_PROJECT_Z]}
            onSelectProject={onSelectProject}
          />
        )}
        {otherProjects.map((project, index) => {
            const xOffset = (index - (totalOtherProjects -1) / 2) * SPACING;
            return (
                 <ProjectExhibit
                    key={project.id}
                    project={project}
                    position={[xOffset, 0, 0]}
                    onSelectProject={onSelectProject}
                />
            )
        })}
      </group>
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={3}
        maxDistance={12}
        target={[0, 0, 0]}
      />
    </>
  );
};
