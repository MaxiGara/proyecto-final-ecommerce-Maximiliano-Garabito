import express from "express";
const app = express();



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API rest en Node.js");
});

app.use((req, res, next) => {
    res.status(404).json({error: "Ruta invalida"})
})

import productsRouter from "./src/routes/products.router.js";
app.use("/api", productsRouter)

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
