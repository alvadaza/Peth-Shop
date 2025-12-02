<!-- Instrucciones breves y accionables para agentes AI que colaboran en este repositorio -->
# Instrucciones para agentes de codificación

Este repositorio es una aplicación React minimal creada con Vite. A continuación encontrarás información concreta y ejemplos que te ayudarán a ser productivo rápidamente.

**Arquitectura (visión rápida):**
- **Bundler / dev:** `vite` (configuración mínima en `vite.config.js`).
- **UI:** React (JSX) en `src/` — entry principal `src/main.jsx`, componente raíz `src/App.jsx`.
- **Estilos:** `src/index.css` y `src/App.css` junto con `src/assets/` para imágenes/recursos.

**Comandos útiles (ejecutar en PowerShell / terminal):**
```
npm install
npm run dev    # desarrollo con HMR
npm run build  # construir para producción
npm run preview # previsualizar la build
npm run lint   # ejecutar ESLint
```

**Dependencias y plugins importantes:**
- Usa `@vitejs/plugin-react-swc` (ver `package.json`), así que las transpilaciones y Fast Refresh se manejan con SWC.
- ESLint está presente y se configura mediante `eslint.config.js` en la raíz.

**Convenciones del proyecto (observables):**
- Mantener componentes React como componentes funcionales exportando `default` (ej.: `export default App`).
- Archivos de UI en `src/` y subcarpetas `src/assets/` para recursos.
- Evita convertir el proyecto a TypeScript sin coordinación (hay tipos en `devDependencies` pero el código actual es JS/JSX).

**Patrones concretos y ejemplos (usa esto como plantilla):**
- Componente raíz esperado en `src/App.jsx`:
```
function App() {
  return (
    <div className="App">Hola mundo</div>
  )
}

export default App
```
- Importar estilos en componentes: `import './App.css'`.

**Qué revisar antes de cambiar cosas grandes:**
- Ejecuta `npm run dev` y `npm run lint` localmente; el árbol actual no compila correctamente (ej. `src/App.jsx` tiene errores de sintaxis detectables). No autorices cambios de gran alcance sin confirmar con el mantenedor.
- Respeta `package.json` scripts y `eslint.config.js` al introducir nuevas reglas o herramientas.

**Dónde buscar información adicional:**
- `README.md` en la raíz (explica que este es el template React + Vite).
- `vite.config.js`, `eslint.config.js` y `package.json` para decisiones de build/lint.
- Código de ejemplo en `src/` para convenciones de import y estructura.

Si alguna sección no queda clara o quieres que añada fragmentos de ejemplo adicionales (tests, estructura de componentes, nombres de carpetas sugeridos), dime qué aspecto quieres detallar y lo actualizo.
