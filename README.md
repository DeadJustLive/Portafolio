# 🧩 Personal Portfolio Website - Ing. Matias Retamal

## 📘 Propósito del Sistema
Este sistema constituye una plataforma de exhibición profesional (Portfolio) diseñada para centralizar y demostrar capacidades técnicas en ingeniería de software, arquitectura de sistemas y desarrollo asistido por IA. El propósito principal es proporcionar un entorno interactivo donde stakeholders y reclutadores puedan validar la calidad de ejecución, el stack tecnológico y la filosofía de desarrollo del autor.

## 📋 Alcance y Objetivos
- **Alcance**: Frontend interactivo con simulaciones de aplicaciones reales (DailyBite, StockSimple, SaaS Template).
- **Objetivos**:
    - Presentar proyectos con trazabilidad técnica y operacional.
    - Demostrar el uso avanzado de micro-animaciones (GSAP) y diseño responsivo premium.
    - Comunicar el "Manifiesto de Desarrollo" sobre la integración ética y eficiente de la IA.

## ⚙️ Requisitos del Sistema

### Requisitos Funcionales
- **RF-01 (Navegación)**: El sistema debe permitir navegación fluida entre secciones (Hero, About, Skills, Projects, Footer).
- **RF-02 (Simulación)**: Debe incluir un modal de simulación PWA/SaaS para los proyectos destacados.
- **RF-03 (Interactividad)**: Implementación de scroll suave y efectos visuales dinámicos.

### Requisitos No Funcionales
- **RNF-01 (Rendimiento)**: Carga optimizada de activos y animaciones ligeras.
- **RNF-02 (Estética)**: Interfaz de alta gama (Premium Design) siguiendo estándares de UX modernos.
- **RNF-03 (Escalabilidad)**: Estructura modular para facilitar la adición de nuevos proyectos.

## 🧱 Arquitectura / Estructura del Proyecto
El proyecto sigue una arquitectura de componentes reactivos modular:
```text
src/
├── app/
│   ├── components/       # Componentes de UI y Secciones (IEEE 830 Modular)
│   │   ├── demos/        # Lógica de simulación para proyectos específicos
│   │   └── ui/           # Elementos atómicos de interfaz
│   └── App.tsx           # Punto de entrada principal y configuración GSAP
├── main.tsx              # Renderizado de React
└── styles/               # Configuración global de Tailwind y CSS
```

## 🧰 Instalación y Configuración
1. Clonar el repositorio: `git clone https://github.com/DeadJustLive/Portafolio.git`
2. Instalar dependencias: `npm install`
3. Configurar entorno de desarrollo: `npm run dev`

## 🚀 Uso Básico / Ejemplo de Ejecución
Para generar la versión de producción optimizada:
```bash
npm run build
```
Para previsualizar localmente:
```bash
npm run preview
```

## 🧑💻 Tecnologías Usadas
- **Core**: React v18, TypeScript.
- **Styling**: Tailwind CSS v4, Lucide React (Iconografía).
- **Animaciones**: GSAP (GreenSock Animation Platform) + ScrollTrigger.
- **Herramientas de Build**: Vite v6.

## 🧾 Cumplimiento IEEE 830 (Resumen)
Este documento cumple con los estándares de especificación de requisitos mediante la definición clara de funciones, interfaces y restricciones del sistema, garantizando la trazabilidad entre el código y los objetivos de negocio del portfolio.

## 🧪 QA y Testing
- **Validación Visual**: Pruebas de regresión visual en entornos desktop y móvil.
- **Build Integrity**: Verificación de integridad de bundles mediante `vite build`.
- **Linting**: [PENDIENTE] Implementación de reglas estrictas de ESLint.

## 🧩 Contribución y Normas de Desarrollo
1. Crear una rama para nuevas features (`feature/new-project`).
2. Mantener la consistencia en el uso de Tailwind y micro-interacciones GSAP.
3. [PENDIENTE] Definición de guía de estilos de código.

## 🔒 Seguridad y Privacidad
El proyecto no recolecta datos personales de usuarios finales. La seguridad se basa en la entrega estática de contenido (Static Site Generation).

## 📄 Licencia y Créditos
- **Autor**: Matias Retamal Barrera
- **Referencia**: Inspirado en el diseño original del equipo de [Make](https://www.figma.com/design/epjEHFlzGCTnQtTVb4X2v3/Personal-Portfolio-Website).
- **Licencia**: Mit License (Proyectado/Privado).