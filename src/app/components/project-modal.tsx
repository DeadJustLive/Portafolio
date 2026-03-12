import { X, CheckCircle, Code, Users, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  userStory: string;
  color: string;
  demoFeatures: string[];
  requirements: string[];
  impact: string;
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-2">{project.title}</DialogTitle>
          <p className="text-purple-300">{project.description}</p>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* User Story */}
          <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg text-blue-300">User Story (IEEE 830)</h3>
            </div>
            <p className="text-blue-100">{project.userStory}</p>
          </div>
          
          {/* Requisitos Funcionales */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg text-purple-300">Requisitos Funcionales</h3>
            </div>
            <ul className="space-y-2">
              {project.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Demo Features */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg text-yellow-300">Demo Funcional (Mock Data)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.demoFeatures.map((feature, i) => (
                <div key={i} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tecnologías */}
          <div>
            <h3 className="text-lg text-purple-300 mb-3">Stack Tecnológico</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Impacto */}
          <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
            <h3 className="text-lg text-green-300 mb-2">Impacto del Proyecto</h3>
            <p className="text-green-100">{project.impact}</p>
          </div>
          
          {/* Footer note */}
          <div className="text-center text-sm text-slate-400 pt-4 border-t border-slate-700">
            Demo implementada con datos mock • Código fuente disponible para cliente
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
