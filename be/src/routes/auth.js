"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const firebase_1 = require("../firebase");
const router = express_1.default.Router();
router.get("/figma", (req, res) => {
    const redirectUri = encodeURIComponent(process.env.FIGMA_REDIRECT_URI);
    const url = `https://www.figma.com/oauth?client_id=${process.env.FIGMA_CLIENT_ID}&redirect_uri=${redirectUri}&scope=file_read&state=YOUR_STATE`;
    res.redirect(url);
});
// Callback pro získání tokenu
router.get("/figma/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, state } = req.query;
    if (!code || state !== "YOUR_STATE") {
        return res.status(400).json({ error: "Invalid request" });
    }
    try {
        // Získání access tokenu od Figmy
        const tokenResponse = yield axios_1.default.post("https://www.figma.com/api/oauth/token", {
            client_id: process.env.FIGMA_CLIENT_ID,
            client_secret: process.env.FIGMA_CLIENT_SECRET,
            redirect_uri: process.env.FIGMA_REDIRECT_URI,
            code,
            grant_type: "authorization_code",
        });
        const { access_token } = tokenResponse.data;
        // Získání profilu z Figma API
        const profileResponse = yield axios_1.default.get("https://api.figma.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const figmaUser = profileResponse.data;
        // Vytvoření uživatele v Firebase Auth
        const firebaseUser = yield firebase_1.auth.createUser({
            uid: `figma:${figmaUser.id}`,
            displayName: figmaUser.handle,
            email: figmaUser.email || "",
        });
        // Uložení uživatele do Realtime DB
        const userRef = firebase_1.db.ref(`users/${firebaseUser.uid}`);
        yield userRef.set({
            uid: firebaseUser.uid,
            email: figmaUser.email,
            figmaId: figmaUser.id,
            createdAt: new Date().toISOString(),
        });
        // Vytvoření Firebase tokenu pro klienta
        const firebaseToken = yield firebase_1.auth.createCustomToken(firebaseUser.uid);
        res.json({ token: firebaseToken });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
