import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { getProductsList, getProductById } from "./list";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://meli-challenge-puce.vercel.app/"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/products", getProductsList);
app.get("/api/product", getProductById);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
