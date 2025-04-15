# UI Primitives Hub

Aplikace, kde jsou připraveny UI primitiva a uživatel má možnost upravit vzhled UI komponenty, kterou následně může:

- stáhnout pomocí CLI a naimportovat do svého projektu
- exportovat do Figma pomocí vlastního pluginu

## 🧠 Hlavní Use-case

1. Uživatel stylizuje komponentu ve webové aplikaci.
2. Pomocí CLI si vygeneruje komponentu do vlastního projektu.
3. Komponentu může také přidat do Figma pomocí pluginu.

---

## 📦 Technologie

### Frontend (`fe/`)
- React + Vite
- TypeScript, TailwindCSS, shadcn/ui
- TanStack Router & Query, Zustand, nuqs

### Backend (`be/`)
- Node.js + Express
- Firebase Realtime Database
- Firebase Admin SDK

### CLI (`cli/`)
- Node.js, Commander, Inquirer, Chalk, Execa, Ora…

### Figma Plugin (`figma-plugin/`)
- Webpack
- [react-figma](https://github.com/react-figma/react-figma)

### Monorepo
- `pnpm` workspaces
- psáno kompletně v TypeScriptu

---

## 📁 Struktura repozitáře

```
.
├── fe/               # Webová aplikace pro stylování UI komponent
├── be/               # Backend – autentizace, CRUD, Firebase
├── figma-plugin/     # Export komponent do Figma
├── cli/              # CLI nástroj pro generování komponent
└── packages/
    ├── common/       # Sdílené utility funkce
    ├── types/        # Sdílené TypeScript typy
    └── ui/           # Stylovatelné UI komponenty
```

---

## 🚀 Spuštění projektu

### 🔧 Instalace
```bash
pnpm install
```

### ▶️ Frontend
```bash
cd fe
pnpm dev
```

**Env:**
```env
VITE_FIREBASE_APIKEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGE_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_BACKEND_API_URL=
```

---

### 🛠️ Backend
```bash
cd be
pnpm dev
```

**Env:**
```env
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
FIREBASE_DATABASE_URL=
PORT=
FIGMA_CLIENT_ID=
FIGMA_CLIENT_SECRET=
FIGMA_REDIRECT_URI=
FRONTEND_URL=
```

---

### 🧩 CLI

Nainstaluj pomocí:

```bash
npx @milancu/ui-primitives-hub
# nebo
pnpm dlx @milancu/ui-primitives-hub
```

**Inicializace:**
```bash
ui-primitives-hub init
```

**Generování komponenty:**
```bash
ui-primitives-hub add -c Accordion
```

Konfigurace se ukládá do:
```
~/.ui-primitives-hub/config.json
```

---

### 🎨 Figma Plugin

```bash
cd figma-plugin
pnpm run webpack:watch
```

**Env:**
```env
FIREBASE_APIKEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGE_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
BACKEND_API_URL=
```

---

## 📄 Licence a autorství

**Autor:** Bc. Phuong Dong Cu  
**Škola:** Fakulta informačních technologií ČVUT  
**Vedoucí práce:** Ing. Jaroslav Kuchař, Ph.D.
---

## 💬 Kontakt

GitHub: [@milancu](https://github.com/milancu)