# UI Primitives Hub – Backend

Backendová část poskytuje REST API pro komunikaci s frontendem, autentizaci a správu dat v databázi.

## 🚀 Spuštění

```bash
pnpm install
pnpm dev
```

## 🌱 Environment variables
Vytvoř `.env` soubor:

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

## 🛠 Použité technologie
- Node.js + Express
- Firebase Realtime Database
- Firebase Admin SDK
- TypeScript
