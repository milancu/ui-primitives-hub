import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
// import componentsRouter from "./routes/components";
import componentsRouter from "./routes/component.route";
import projectsRouter from "./routes/project.route";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json(), cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use("/auth", authRouter);
app.use('/projects', [projectsRouter, componentsRouter])

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});