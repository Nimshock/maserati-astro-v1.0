# 🔱 Maserati 110 Aniversario - Web Experience

![Maserati Banner](/public/assets/images/logos-image/logoMaserati.png)

> **"110 Años de Pura Pasión".**
> Una plataforma web inmersiva desarrollada con **Astro** y **React** que fusiona lujo, innovación y rendimiento. Este proyecto no es solo una landing page, es una aplicación interactiva completa con e-commerce, reservas de eventos, geolocalización y configuración de vehículos en tiempo real mediante gestos.

---

## 📋 Índice

1. [Características Principales](#-características-principales)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
4. [Detalle de Funcionalidades](#-detalle-de-funcionalidades)
5. [Instalación y Despliegue](#-instalación-y-despliegue)
6. [Autor](#-autor)

---

## 🚀 Características Principales

### 🎨 Configurador "Rasca y Gana" (Canvas API)
Una experiencia táctil única. El usuario descubre el color del coche "rascando" una capa blanca digital que revela la imagen real bajo un boceto técnico.
- **Tecnología:** HTML5 Canvas + `globalCompositeOperation="destination-out"`.
- **Efecto Visual:** El boceto se superpone con `mix-blend-multiply` para mantener los detalles negros sobre el color revelado.

### 🛍️ Tienda y Carrito Persistente
Sistema completo de e-commerce sin recargas de página (SPA-like feel).
- **Carrito Global:** Accesible desde cualquier punto de la web (`CartDrawer`), sincronizado con `localStorage`.
- **Lógica de Negocio:** Control de stock máximo y cálculo de totales en tiempo real usando **Nanostores**.
- **Filtrado:** Navegación por categorías con transiciones suaves.

### 📍 Geolocalización y Mapas
- **Buscador de Concesionarios:** Utiliza la API de Geolocalización del navegador y la fórmula Haversine para calcular la distancia entre el usuario y los concesionarios oficiales (simulados).
- **Mapas Interactivos:** Integración de **Leaflet** para visualizar la sede de Módena.

### 📊 Dashboard de Datos
- **Gráficos Animados:** Visualización de KPIs y estadísticas con animaciones CSS y GSAP ScrollTrigger.

---

## 🛠 Stack Tecnológico

El proyecto utiliza una arquitectura de "Islas" para máximo rendimiento:

* **Core:** [Astro](https://astro.build/) (HTML estático por defecto).
* **Interactividad:** [React](https://reactjs.org/) (Para componentes complejos: Carrito, Configurador, Tienda).
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Diseño responsivo y utilitario).
* **Estado Global:** [Nanostores](https://github.com/nanostores/nanostores) (Gestión de estado ligera entre Astro y React).
* **Animaciones:** [GSAP](https://greensock.com/gsap/) (ScrollTrigger y Timelines).
* **Mapas:** [Leaflet](https://leafletjs.com/).

---

## 📂 Arquitectura del Proyecto

```bash
maserati-experience/
├── public/
│   └── assets/              # Recursos estáticos (Imágenes, Vídeos, Iconos)
├── src/
│   ├── components/          # 🧩 Bloques de UI
│   │   ├── CarColorizer.jsx     # Lógica del Canvas "Rasca y Gana"
│   │   ├── CartDrawer.jsx       # Sidebar del carrito (React + Nanostores)
│   │   ├── EventCard.jsx        # Tarjeta de evento con lógica de stock
│   │   ├── Features.astro       # Sección estática con animaciones GSAP
│   │   ├── Footer.astro         # Pie de página y Modal de Cookies
│   │   ├── GlobalConfigurator.jsx # Contenedor modal del configurador
│   │   ├── Hero.astro           # Portada con vídeo de fondo
│   │   ├── Navbar.astro         # Menú responsive y animaciones hover
│   │   ├── ProductCard.jsx      # Componente de producto individual
│   │   └── ProductGrid.jsx      # Grid filtrable de productos
│   ├── data/                # 💾 Fuentes de datos estáticas
│   │   ├── cars.js              # Modelos, colores y rutas de imágenes
│   │   ├── events.js            # Catálogo de eventos
│   │   └── products.js          # Catálogo de merchandising
│   ├── layouts/
│   │   └── Layout.astro     # 📐 Plantilla base (SEO, Scripts globales)
│   ├── pages/               # 🌐 Rutas de la web
│   │   ├── accesibilidad.astro  # Declaración legal
│   │   ├── comunidad.astro      # Testimonios con API RandomUser
│   │   ├── contacto.astro       # Formulario y Geolocalización
│   │   ├── eventos.astro        # Listado de eventos
│   │   ├── graficos.astro       # Dashboard de métricas
│   │   ├── index.astro          # Landing Page principal
│   │   ├── mapa.astro           # Integración Leaflet
│   │   ├── sobreNosotros.astro  # Historia y valores
│   │   └── tienda.astro         # E-commerce principal
│   ├── stores/              # 🧠 Estado Global
│   │   ├── cartStores.js        # Lógica de carrito y localStorage
│   │   └── configuratorStore.js # Control del modal "Rasca y Gana"
│   └── styles/
│       └── global.css       # Configuración de Tailwind @theme
└── package.json
