🐾 PetShop - Tienda Online para Mascotas (React + Vite)
📝 Descripción del Proyecto
PetShop es una aplicación web desarrollada con React que funciona como tienda en línea especializada en productos premium para mascotas. La plataforma está diseñada para dueños que consideran a sus animales de compañía como parte de la familia, ofreciendo una experiencia de compra moderna e intuitiva.

✨ Características Principales
Interfaz React moderna con componentes reutilizables

Autenticación de usuarios con Supabase

Carrito de compras en tiempo real con Context API

Diseño responsive y animaciones optimizadas

Gestión de estado con hooks personalizados

Formularios validados para contacto y login

Modales interactivos para mejor UX

Filtrado y búsqueda de productos

🏗️ Arquitectura del Proyecto
Estructura de Carpetas Actualizada
text
pet-shop/
├── src/
│   ├── assets/                 # Recursos estáticos (imágenes, íconos)
│   ├── components/             # Componentes reutilizables
│   │   ├── About/             # Componente Acerca de
│   │   ├── AlertModal/        # Modal de alertas
│   │   ├── Articles/          # Componente de artículos/blog
│   │   ├── CartModal/         # Modal del carrito
│   │   ├── ConfirmModal/      # Modal de confirmación
│   │   ├── CustomerData/      # Datos del cliente
│   │   ├── Filter/            # Componente de filtrado
│   │   ├── Footer/            # Pie de página
│   │   ├── GalleryModal/      # Modal de galería
│   │   ├── Header/            # Encabezado
│   │   ├── Loader/            # Componente de carga
│   │   ├── Navbar/            # Barra de navegación
│   │   ├── ProductsGrid/      # Grid de productos
│   │   └── ToSearch/          # Componente de búsqueda
│   │
│   ├── context/               # Contextos de React
│   │   ├── auth.js            # Configuración de autenticación
│   │   ├── AuthProvider.jsx   # Proveedor de autenticación
│   │   └── CartContext.jsx    # Contexto del carrito
│   │
│   ├── hooks/                 # Hooks personalizados
│   │   ├── useAuth.js         # Hook para autenticación
│   │   ├── useCart.js         # Hook para carrito
│   │   ├── useDatos.js        # Hook para datos
│   │   ├── useScrollAnimation.js # Hook para animaciones
│   │   └── useValidation.js   # Hook para validaciones
│   │
│   ├── pages/                 # Páginas principales
│   │   ├── ContactForm.css    # Estilos del formulario contacto
│   │   ├── ContactForm.jsx    # Página de contacto
│   │   ├── Home.jsx           # Página de inicio
│   │   ├── Login.css          # Estilos de login
│   │   ├── Login.jsx          # Página de login
│   │   ├── Main.css           # Estilos principales
│   │   ├── Main.jsx           # Layout principal
│   │   ├── NotFound.css       # Estilos de 404
│   │   └── NotFound.jsx       # Página 404
│   │
│   ├── router/                # Configuración de rutas
│   │   └── Router.jsx         # Enrutador principal
│   │
│   ├── supabase/              # Configuración de Supabase
│   │   └── (archivos de configuración)
│   │
│   ├── utils/                 # Utilidades y helpers
│   │
│   ├── App.css                # Estilos globales de la App
│   ├── App.jsx                # Componente principal App
│   ├── index.css              # Estilos de índice
│   └── main.jsx               # Punto de entrada
│
├── public/                    # Archivos públicos
├── env/                       # Variables de entorno
├── .gitignore                 # Archivos ignorados por Git
├── eslint.config.js           # Configuración de ESLint
├── index.html                 # Plantilla HTML principal
├── package-lock.json          # Lock de dependencias
├── package.json               # Dependencias y scripts
├── README.md                  # Este archivo
└── vite.config.js             # Configuración de Vite
Stack Tecnológico Detallado
json
{
  "Frontend": "React 18 + Vite",
  "Estilado": "CSS Modules / Vanilla CSS",
  "Enrutamiento": "React Router DOM",
  "Autenticación": "Supabase Auth",
  "Estado Global": "React Context API",
  "Hooks": "Custom Hooks",
  "Formularios": "Validación personalizada",
  "Build Tool": "Vite",
  "Linting": "ESLint",
  "Hosting": "Netlify (Frontend)",
  "Backend as a Service": "Supabase"
}
🚀 Instalación y Configuración Local
Prerrequisitos
Node.js 16+ y npm/yarn

Cuenta en Supabase (para backend)

Git

Pasos para ejecutar localmente
Clonar el repositorio:

bash
git clone https://github.com/tu-usuario/pet-shop.git
cd pet-shop
Instalar dependencias:

bash
npm install
# o
yarn install
Configurar variables de entorno:

Copiar .env.example a .env.local

Configurar las credenciales de Supabase:

env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
Ejecutar en desarrollo:

bash
npm run dev
# o
yarn dev
Abrir en navegador:

La app estará disponible en http://localhost:5173

Scripts Disponibles
json
{
  "dev": "vite",              // Inicia servidor de desarrollo
  "build": "vite build",      // Crea build de producción
  "preview": "vite preview",  // Previsualiza build de producción
  "lint": "eslint ."          // Ejecuta linter
}
🔧 Configuración de Supabase
El proyecto utiliza Supabase para:

Autenticación: Login/registro de usuarios

Base de datos: Productos, órdenes, usuarios

Storage: Imágenes de productos

Configuración inicial:
Crear proyecto en Supabase

Configurar tablas necesarias:

products (id, nombre, precio, categoría, imagen)

users (id, email, nombre, dirección)

orders (id, user_id, total, estado)

Configurar políticas de RLS (Row Level Security)

Obtener URL y anon key para las variables de entorno

📱 Componentes Principales
Core Components
AuthProvider: Maneja autenticación en toda la app

CartContext: Estado global del carrito de compras

Router: Sistema de navegación con rutas protegidas

UI Components
Navbar: Navegación principal con menú responsivo

ProductsGrid: Muestra productos con filtros

CartModal: Vista del carrito interactivo

Loader: Indicadores de carga personalizados

Page Components
Home: Página de inicio con featured products

ContactForm: Formulario de contacto validado

Login: Página de autenticación

NotFound: Página 404 personalizada

🎨 Estilos y Diseño
Estructura CSS
Archivos modularizados: Cada componente tiene su CSS

Variables CSS: Colores, fuentes, breakpoints centralizados

Responsive Design: Mobile-first approach

Animaciones: Usando useScrollAnimation hook

Theme Variables (ejemplo en index.css):
css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #1a936f;
  --text-color: #333;
  --bg-color: #f8f9fa;
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
}
🔄 Estado y Hooks
Contextos
javascript
// Ejemplo de uso del carrito
import { useCart } from './hooks/useCart';

const { cart, addToCart, removeFromCart } = useCart();
Hooks Personalizados
useAuth: Manejo de sesión de usuario

useCart: Operaciones del carrito

useValidation: Validación de formularios

useScrollAnimation: Animaciones al hacer scroll

📡 API y Comunicación
Endpoints Supabase
javascript
// Ejemplo de fetch de productos
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'alimentos');
Estructura de Datos
javascript
// Producto típico
{
  id: 'prod_001',
  name: 'Alimento Premium Perro Adulto',
  price: 89900,
  category: 'alimentos',
  image: 'url_imagen',
  description: 'Alimento balanceado...',
  stock: 50
}
🚀 Despliegue en Netlify
Configuración de Netlify:
Build Settings:

text
Build command: npm run build
Publish directory: dist
Variables de entorno en Netlify:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Configuración adicional:

netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
Dominio Personalizado
Configurar dominio en Netlify DNS

SSL automático con Let's Encrypt

Deploy previews para cada PR

🧪 Testing
Pruebas a Implementar:
bash
# Instalar dependencias de testing
npm install --save-dev jest @testing-library/react

# Scripts de testing (agregar a package.json)
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
Estructura de Tests:
text
__tests__/
├── components/
│   ├── CartModal.test.jsx
│   └── ProductsGrid.test.jsx
├── hooks/
│   ├── useCart.test.js
│   └── useAuth.test.js
└── pages/
    ├── Home.test.jsx
    └── Login.test.jsx
📊 Performance Optimization
Estrategias Implementadas:
Code Splitting: Rutas lazy-loaded

Image Optimization: Formatos modernos, lazy loading

Bundle Analysis: npm run build -- --report

Caching Strategies: Service Workers (PWA ready)

Métricas Objetivo:
First Contentful Paint: < 1.5s

Time to Interactive: < 3s

Lighthouse Score: > 90

🔄 Flujo de Desarrollo Git
Branch Strategy:
bash
main                    # Producción
├── develop             # Integración
├── feature/*          # Nuevas funcionalidades
├── bugfix/*           # Correcciones
└── hotfix/*           # Correcciones urgentes
Commit Convention:
bash
feat:     Nueva característica
fix:      Corrección de bug
docs:     Documentación
style:    Formato, estilo
refactor: Refactorización
test:     Tests
chore:    Tareas de mantenimiento
📈 Roadmap de Desarrollo
Fase 1 - MVP (Actual)
Estructura base React + Vite

Autenticación con Supabase

Carrito de compras básico

Catálogo de productos

Diseño responsive

Fase 2 - Mejoras UX/UI
Filtros avanzados de productos

Sistema de reviews y ratings

Wishlist de productos

Checkout optimizado

Notificaciones en tiempo real

Fase 3 - Escalabilidad
PWA (Aplicación Web Progresiva)

Internacionalización (i18n)

Dashboard de administración

Analytics integrado

API REST propia

🤝 Contribución
Guía para Contribuir:
Fork del repositorio

Crear rama de feature: git checkout -b feature/nueva-feature

Commit cambios: git commit -m 'feat: descripción clara'

Push a la rama: git push origin feature/nueva-feature

Abrir Pull Request

Estándares de Código:
Usar componentes funcionales con hooks

Seguir estructura de carpetas existente

Incluir PropTypes o TypeScript

Escribir tests para nuevas funcionalidades

Documentar componentes complejos

🐛 Solución de Problemas Comunes
Problemas de Autenticación:
javascript
// Verificar configuración de Supabase
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
Problemas de Build:
bash
# Limpiar cache
rm -rf node_modules/.vite
npm run build -- --force

# Verificar variables de entorno
npm run build:analyze
Problemas de CORS:
Verificar políticas de Supabase

Configurar sitios autorizados en dashboard de Supabase

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

📞 Soporte y Contacto
Soporte Técnico:
Issues: GitHub Issues

Email: desarrollo@petshop.com

Soporte Clientes:
WhatsApp: +57 313 357 4711

Sitio: https://pet-shop-dun.netlify.app/

Redes Sociales:
Instagram: @petshop_colombia

Facebook: /PetShopColombia

🙏 Agradecimientos
Equipo de Desarrollo: Por su dedicación y compromiso

Comunidad React: Por las herramientas y librerías open-source

Clientes PetShop: Por su confianza y feedback constante

Supabase: Por proporcionar una backend as a service excelente

¡Gracias por usar PetShop! ❤️🐾

"Porque tu mascota no es solo una mascota... es familia"

Última actualización: 11 diciembre 2025 | Versión: 1.0.0