import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import firebase from "firebase-admin";
import * as dotenv from "dotenv";

const port = process.env.PORT || 3000;

dotenv.config();

admin.initializeApp({
  credential: firebase.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com"
  }), databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const getAttributes = (root) => {
  return Object.keys(root).reduce((attributes, attributeKey) => {
    attributes[attributeKey] = root[attributeKey];
    return attributes;
  }, {});
};


function addDataPrefix(input, key) {
  return (input
      .split(/\s+/)
      .map((word) => `data-[${key}]:${word}`)
      .join(" ") + " ");
}

const getRawTailwindClasses = (style) => {
  let result = "";
  result += style.default + " ";
  Object.keys(style).forEach(key => {
    if (key === "default") {
      return;
    }
    result += addDataPrefix(style[key], key);
  });
  return result;
};

const getAccordionClasses = async () => {
  const ref = db.ref("accordion");
  const snapshot = await ref.once("value");
  const accordion = snapshot.val();

  return Object.keys(accordion).reduce((acc, key) => {
    acc[key] = {
      name: key, raw: getRawTailwindClasses(accordion[key]), attributes: getAttributes(accordion[key])
    };
    return acc;
  }, {});
}


app.get("/accordion", async (req, res) => {
  const accordion = {
    hierarchy: {
      name: "root", children: [{
        name: "item", children: [{
          name: "header", children: [{name: "trigger"}],
        }, {name: "panel"},],
      },],
    }, parts: await getAccordionClasses()
  }

  try {
    res.json(accordion);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.put("/accordion", async (req, res) => {
  const {id, data} = req.body;

  if (!id || !data) {
    return res.status(400).json({error: "ID nebo data chybí"});
  }

  try {
    const ref = db.ref(`accordion/parts/${id}`);
    await ref.update(data);
    res.status(200).json({message: "Úspěšně aktualizováno"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.listen(port, () => console.log(`Server běží na portu ${port}`));