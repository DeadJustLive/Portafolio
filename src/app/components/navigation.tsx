import { useEffect, useState } from 'react';
import { Home, Code, Briefcase, Mail } from 'lucide-react';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar nav después de scroll
      setIsVisible(window.scrollY > 300);
      
      // Detectar sección activa
      const sections = ['hero', 'skills', 'projects', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', icon: Home, label: 'Inicio' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: Briefcase, label: 'Proyectos' },
    { id: 'contact', icon: Mail, label: 'Contacto' },
  ];

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-lg shadow-black/20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline text-sm">{item.label}</span>
              
              {/* Indicator */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
