import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import componentsRouter from "./routes/component.route.js";
import projectsRouter from "./routes/project.route.js";
import verifyRoute from "./routes/verify.route.js";
import cors from "cors";

dotenv.config();

export const app = express();
app.use(express.json(), cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use("/auth", [authRouter, verifyRoute]);
app.use('/projects', [projectsRouter, componentsRouter])

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

