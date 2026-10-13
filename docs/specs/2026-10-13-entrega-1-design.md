# Deventure Front · Entrega 1 · Diseño

- **Fecha:** 2026-10-13
- **Estado:** en revisión
- **Fuente funcional:** `deventure/docs/analisis-funcional.md` (repo backend). Si algo de acá lo
  contradice, gana el análisis funcional.

## 1. Objetivo

Construir la base profesional del frontend de Deventure y su primera entrega: un recorrido real
**inicio → registro/login → intro con Björn → zonas**, conectado al backend, con estética
**vikinga gamer** y muchas animaciones, sin resignar accesibilidad ni rendimiento.

### Decisiones tomadas

| Tema                  | Decisión                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Ubicación             | Repo propio en `C:\proyectos\deventure-front`                                                            |
| Lenguaje              | TypeScript estricto                                                                                      |
| Gestor de paquetes    | pnpm                                                                                                     |
| Alcance entrega 1     | Shell del juego + auth + intro + zonas con datos reales                                                  |
| Mecánicas             | Las del análisis funcional (3 vidas, estrellas, racha, recompensas). Se descartan XP, gemas, ligas, ranking y clanes del prototipo |
| Prototipo AI Studio   | Se mueve a `reference/` como referencia visual, fuera del build. No se usa su código                     |
| Contratos             | Copia de los esquemas Zod del backend en `src/shared/contracts`                                          |
| Ilustraciones         | SVG propios hechos en código, animables por partes                                                       |
| Rutas                 | Orientadas a recursos (`/zones`, `/levels/:levelId`). Excepciones de acción: `/`, `/login`, `/register`, `/intro` |
| Tests                 | No obligatorios (decisión del equipo). Verificación manual con checklist + Playwright                   |

### Fuera de alcance de la entrega 1

Pantalla de nivel y minijuegos, resultado, progreso, galería, pantalla final, panel admin,
asistente IA, música de fondo y sincronización de ajustes con la cuenta.

## 2. Stack

| Necesidad          | Elección                                              |
| ------------------ | ----------------------------------------------------- |
| Build              | Vite + React 19 + TypeScript                          |
| Estilos            | Tailwind CSS v4 con tokens propios (`@theme`)         |
| Rutas              | React Router                                          |
| Estado de servidor | TanStack Query                                        |
| Estado de cliente  | Zustand (`persist` para sesión y ajustes)             |
| Formularios        | react-hook-form + Zod (`@hookform/resolvers`)         |
| Animaciones        | Motion (`motion/react`)                               |
| Íconos             | lucide-react                                          |
| Fuentes            | `@fontsource/*` (alojadas en el proyecto, sin CDN)    |
| Calidad            | ESLint (typescript-eslint, react-hooks, jsx-a11y), Prettier, Husky, lint-staged, commitlint |

Las versiones exactas se fijan al crear el proyecto, verificadas contra la documentación oficial
(context7).

## 3. Arquitectura

### Estructura

```
deventure-front/
├── reference/                 prototipo de AI Studio (solo referencia, fuera del build)
├── docs/specs/                esta spec y las siguientes
├── public/
└── src/
    ├── app/                   App (providers), router, guards (RequireSession, RedirectIfSession)
    ├── features/
    │   ├── home/
    │   ├── auth/
    │   ├── intro/
    │   ├── zones/
    │   └── settings/
    ├── shared/
    │   ├── api/               httpClient, ApiError, queryKeys
    │   ├── contracts/         esquemas Zod copiados del backend + tipos z.infer
    │   ├── ui/                componentes base
    │   ├── illustrations/     SVG de Björn, drakkar, runas, escenario
    │   ├── motion/            variantes y transiciones reutilizables
    │   ├── sound/             motor de efectos Web Audio
    │   ├── config/            env validado con Zod
    │   └── constants/         rutas, textos, límites
    ├── stores/                sessionStore, settingsStore
    ├── styles/theme.css
    └── main.tsx
```

### Reglas de dependencia

- `features/*` usa `shared/` y `stores/`. Una feature **no** importa de otra.
- `shared/` no conoce ninguna feature.
- Imports con alias `@/`; nunca `../../`.
- Cada feature organiza su contenido en `api/` (funciones de fetch), `hooks/` (queries y
  mutations), `components/` y la página (`<Nombre>Page.tsx`).

### Rutas

| Ruta                | Acceso                            | Pantalla                       |
| ------------------- | --------------------------------- | ------------------------------ |
| `/`                 | todos                             | Inicio                         |
| `/login`            | sin sesión (con sesión → destino de "Jugar") | Login               |
| `/register`         | sin sesión (con sesión → destino de "Jugar") | Registro            |
| `/intro`            | con sesión                        | Introducción con Björn         |
| `/zones`            | con sesión                        | Zonas y niveles                |
| `*`                 | todos                             | 404                            |

**Destino de "Jugar":** sin sesión → `/login`; con sesión y `introSeen = false` → `/intro`;
si no → `/zones`.

## 4. Sistema de diseño

### Tokens (`src/styles/theme.css`)

| Token          | Valor                 | Uso                                      |
| -------------- | --------------------- | ---------------------------------------- |
| `night`        | `#0b1323`             | Fondo                                    |
| `fjord-900…500`| `#060e1e` → `#2d3546` | Paneles por capa                         |
| `aurora`       | `#00f0ff`             | Acción principal, camino, acierto        |
| `rune-gold`    | `#ffd65b`             | Estrellas, recompensas, anillo de foco   |
| `ember`        | `#ffb59d`             | Vidas, error, derrota                    |
| `frost`        | `#dbe2f9`             | Texto principal                          |
| `mist`         | `#b9cacb`             | Texto secundario                         |

Prohibido usar hex sueltos en componentes (`bg-[#...]`). Todo color sale de un token.

### Tipografía

Space Grotesk (títulos), Plus Jakarta Sans (texto), JetBrains Mono (código y etiquetas) y
**Cinzel Decorative** (logo y títulos épicos, licencia OFL), todas desde `@fontsource`. Solo se
cargan los pesos usados (400, 600, 700).

### Componentes base (`shared/ui`)

`Button` (variantes `aurora`, `gold`, `ghost`; sombra sólida de 6px que se hunde al presionar),
`Panel`, `TextField`, `Modal` (foco atrapado, cierra con Escape), `Toast`, `Stars`, `Lives`,
`ProgressBar`, `Slider`, `RuneSkeleton`.

### Ilustraciones (`shared/illustrations`)

SVG en componentes React con partes nombradas para animarlas por separado: `Bjorn` (ojos, pecho,
barba), `Drakkar`, `Rune`, `Aurora`, `SeaWaves`, `Fog`, `ZoneIsland`.

### Animaciones

| Dónde            | Animación                                                                      |
| ---------------- | ------------------------------------------------------------------------------ |
| Entre pantallas  | Transición "página de saga" con `AnimatePresence`                              |
| Inicio           | Aurora animada, runas flotando, drakkar meciéndose, logo con golpe de martillo |
| Botones          | Hundimiento al presionar, brillo al hover, sonido rúnico                       |
| Login / registro | Escudo que tiembla ante error, estallido de runas al entrar, reglas de contraseña que se encienden |
| Intro            | Björn respira y parpadea; texto máquina de escribir                            |
| Zonas            | Camino que se dibuja (`pathLength`), nodos en cascada, niebla y olas en parallax |

**Reglas de animación:**

- Solo se animan `transform` y `opacity`.
- `MotionConfig reducedMotion="user"`: con "reducir movimiento" no hay partículas ni parallax,
  solo fundidos.
- Ninguna animación bloquea la interacción; las secuencias largas se pueden saltar.
- Foco visible con `rune-gold`, objetivos táctiles de 44px o más, contraste AA.
- El brillo (RF12) se aplica con `filter: brightness()` en la raíz, desde `settingsStore`.

### Sonido

Motor Web Audio (idea del prototipo, reescrito): efectos de clic rúnico, error y éxito. Respeta
el volumen y silencio del `settingsStore` y solo se inicia tras un gesto del usuario.

## 5. Datos, sesión y errores

### Cliente HTTP (`shared/api/httpClient.ts`)

- `fetch` sobre `VITE_API_URL` (validada con Zod al iniciar).
- Agrega `Authorization: Bearer <token>` desde `sessionStore`.
- Valida cada respuesta con el esquema Zod del endpoint (`{ data }`).
- Respuesta no OK → `ApiError { status, code, message, details }` a partir de `{ error }`.
- 401 con sesión activa → limpia la sesión y navega a `/login` (excepto en el propio login).

### Sesión (`stores/sessionStore.ts`)

- `{ token, user }` con `persist` en `localStorage`.
- Al iniciar con token: `GET /api/auth/me` valida la sesión; si falla con 401, se limpia.
- Riesgo aceptado: token en `localStorage` frente a XSS. Mitigación: CSP estricta y sin
  `dangerouslySetInnerHTML`. Mejora futura: cookie `httpOnly` (requiere cambio en el backend).

### TanStack Query

- Claves centralizadas en `shared/api/queryKeys.ts`.
- `staleTime` de 5 minutos para contenido.
- Reintentos solo para errores de red y 5xx.
- Login y registro como mutations: al éxito guardan la sesión y navegan al destino de "Jugar".

### Errores en pantalla

| Caso                                     | Presentación                                              |
| ---------------------------------------- | --------------------------------------------------------- |
| `VALIDATION_ERROR`                       | Mensaje bajo cada campo (`details: { campo: [mensajes] }`) |
| `USERNAME_TAKEN`, `EMAIL_TAKEN`          | Mensaje bajo el campo                                     |
| `INVALID_CREDENTIALS`                    | Escudo tiembla + mensaje del backend                      |
| `ACCOUNT_LOCKED` (423), `TOO_MANY_REQUESTS` (429) | Mensaje del backend                              |
| 5xx o sin red                            | Mensaje genérico + reintentar. Nunca el mensaje crudo     |
| Error inesperado de render               | Error boundary vikingo con "Volver al inicio"             |

### Endpoints que usa la entrega 1

| Endpoint                          | Estado en el backend          |
| --------------------------------- | ----------------------------- |
| `POST /api/auth/register`         | Existe                        |
| `POST /api/auth/login`            | Existe                        |
| `GET /api/auth/me`                | Existe                        |
| `PATCH /api/auth/me/intro-seen`   | **Falta: se agrega en auth-service como parte de esta entrega** |
| `GET /api/content/zones`          | Existe (DEV-02)               |
| `GET /api/content/levels/:levelId`| Existe (DEV-02), usado para la tarjeta del nivel |

El front corre en el puerto **5173**, que es el `CORS_ORIGIN` por defecto del gateway.

## 6. Pantallas

### Inicio (`/`)

Logo DEVENTURE, botones **Jugar**, **Ajustes** y **Salir**. "Salir" solo se muestra con sesión,
pide confirmación ("¿Seguro que querés salir?") y cierra la sesión.

### Login (`/login`) y registro (`/register`)

Validación con los esquemas de `shared/contracts` (mismos límites que el backend: usuario 3-20
`[a-zA-Z0-9_]`, email válido, contraseña 8-72 con letra y número). En registro, cada regla de la
contraseña se enciende como runa al cumplirse.

### Intro (`/intro`)

Björn con 4 o 5 globos de diálogo: qué es Deventure, qué se aprende (lógica, C#, SQL) y cómo se
juega (mapa, niveles, 3 vidas, pistas, recompensas). "Siguiente" y "Saltar intro" siempre
visibles. Al terminar o saltar: `PATCH /api/auth/me/intro-seen` y navegación a `/zones`.

### Zonas (`/zones`)

HUD con usuario, ajustes y salir. Zonas publicadas en orden, cada una con sus niveles sobre un
camino. Tocar un nivel abre una tarjeta con título y cantidad de desafíos (de
`GET /api/content/levels/:levelId`) y la etiqueta "Próximamente".

Los niveles se muestran **sin estado** (bloqueado, disponible, completado) ni estrellas: eso lo
decide progress-service (DEV-07, DEV-13), que todavía no existe. No se simula esa lógica en el
front.

### Ajustes (modal)

Volumen de efectos con silencio (al quitar el silencio vuelve el volumen anterior) y brillo de
50 a 150. Se guardan en `settingsStore`. El volumen de música se agrega cuando exista una pista.

### 404 (`*`)

"Esta tierra no figura en ningún mapa" con botón al inicio.

## 7. Reglas de código

Mismas reglas del backend (`deventure/.claude/rules/code-review-rules.md`, sección 13 y
generales), adaptadas:

- Nombres descriptivos (ESLint `id-length` mínimo 2), sin `console`, sin `any`, sin comentarios
  ni JSDoc, sin ternarios anidados, sin comparar contra `null`/`undefined`.
- `map` está permitido para renderizar listas en JSX.
- Ninguna llamada HTTP en componentes: solo en `features/*/api` vía `httpClient`.
- No filtrar, ordenar ni agregar datos en el cliente: se pide al backend.
- Sin funciones inline en el JSX: los handlers se declaran en el cuerpo del componente.
- Textos de interfaz y rutas en `shared/constants`.
- Tipos con `type`, no `interface`.
- Componentes de una sola responsabilidad; si una página pasa de ~150 líneas, se divide.

## 8. Calidad y verificación

- Scripts: `pnpm dev`, `pnpm build` (`tsc -b && vite build`), `pnpm typecheck`, `pnpm lint`,
  `pnpm format`, `pnpm format:check`.
- Husky: `pre-commit` con lint-staged, `commit-msg` con commitlint. Scopes: `ui`, `home`, `auth`,
  `intro`, `zones`, `settings`, `api`, `repo`, `ci`, `docs`.
- CI (GitHub Actions) en cada PR: lint, typecheck, format:check y build.
- Verificación manual de cada pantalla con Playwright en un navegador real: flujo completo,
  navegación con teclado, anchos 360/768/1440 px sin scroll horizontal, "reducir movimiento" y
  Lighthouse (Performance ≥ 85 y Accessibility ≥ 90 en `/zones`).
- `CLAUDE.md` y `.claude/rules` propios del repo.

## 9. Criterio de terminado

- Recorrido inicio → registro → intro → zonas funcionando contra el backend real (y login para
  un usuario existente que ya vio la intro → directo a zonas).
- Todas las animaciones de la sección 4, con "reducir movimiento" respetado.
- Navegable completo con teclado.
- `pnpm lint`, `pnpm typecheck` y `pnpm build` en verde.
- Lighthouse en `/zones`: Performance ≥ 85, Accessibility ≥ 90.
