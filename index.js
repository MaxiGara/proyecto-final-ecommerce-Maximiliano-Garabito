import "dotenv/config";
import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("API rest en Node.js");
});

import productsRouther from "./src/routes/products.router.js";
app.use("/api", productsRouter)

import authRouter from "./src/routes/auth.router.js";
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta invalida" })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
