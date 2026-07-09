import { useEffect, useState, useRef } from 'react';
import { Home, Code, Briefcase, Mail, User, ChevronUp, Lightbulb, Building2, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar nav después de scroll
      setIsVisible(window.scrollY > 300);

      // Detectar sección activa
      const sections = ['hero', 'about', 'about-me', 'skills', 'projects', 'contact', 'workflow', 'pricing', 'services'];
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', icon: Home, label: 'Inicio' },
    { id: 'about-me', icon: User, label: 'Sobre mí' },
    { id: 'services', icon: Briefcase, label: 'Servicios' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: Lightbulb, label: 'Proyectos' },
    { id: 'workflow', icon: Briefcase, label: 'Proceso' },
    { id: 'pricing', icon: Building2, label: 'Tarifas' },
    { id: 'contact', icon: Mail, label: 'Contacto' },
  ];

  const renderNavItem = (item: typeof navItems[0], hideLabel = false, customClass = "") => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;

    return (
      <button
        key={item.id}
        onClick={() => {
          scrollToSection(item.id);
          setIsMobileMenuOpen(false);
        }}
        className={`group relative flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
          isActive
            ? 'bg-purple-600 text-white'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        } ${customClass}`}
        aria-label={item.label}
      >
        <Icon className="w-4 h-4" />
        <span className={hideLabel ? "hidden xl:inline text-sm" : "text-sm"}>{item.label}</span>

        {/* Indicator */}
        {isActive && hideLabel && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full" />
        )}
      </button>
    );
  };

  const mobileVisibleItems = ['hero', 'projects', 'contact'];
  const mobileDropdownItems = navItems.filter(item => !mobileVisibleItems.includes(item.id));

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div 
          ref={menuRef}
          className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-lg shadow-black/20"
        >
          {/* Desktop/Tablet Nav (All items) */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => renderNavItem(item, true))}
          </div>

          {/* Mobile Nav (Partial items + Dropdown) */}
          <div className="flex lg:hidden items-center gap-1">
            {navItems
              .filter(item => mobileVisibleItems.includes(item.id))
              .map((item) => renderNavItem(item, true))}
            
            {/* Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                aria-label="Más opciones"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              {/* Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-full mt-3 right-0 w-48 py-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-xl shadow-black/40 flex flex-col gap-1 px-2 z-50">
                  {mobileDropdownItems.map((item) => renderNavItem(item, false, "w-full justify-start rounded-xl py-3"))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <div className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('hero');
          }}
          className="flex items-center justify-center focus:outline-none group"
          aria-label="Volver al inicio"
        >
          <div className="w-12 h-12 rounded-full border border-slate-700/50 flex items-center justify-center bg-slate-900/80 transition-all shadow-lg relative group-hover:border-slate-500 group-hover:bg-slate-800">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <ChevronUp className="w-5 h-5 text-slate-400 transition-colors relative z-10 group-hover:text-white" />
          </div>
        </button>
      </div>
    </>
  );
}
