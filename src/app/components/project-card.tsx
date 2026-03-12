import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    userStory: string;
    color: string;
  };
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const eyelidRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleMouseEnter = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      gsap.to(eyelidRef.current, {
        clipPath: 'ellipse(150% 150% at 50% 50%)',
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-80"
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {/* Fondo base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
      
      {/* Efecto de párpado */}
      <div
        ref={eyelidRef}
        className="absolute inset-0 bg-slate-900"
        style={{
          clipPath: 'ellipse(0% 0% at 50% 50%)',
        }}
      />
      
      {/* Contenido */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl text-white">{project.title}</h3>
            <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </div>
          
          <p className="text-white/80 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/20 transition-colors">
            Ver Demo & Detalles
          </button>
        </div>
      </div>
      
      {/* Overlay hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
