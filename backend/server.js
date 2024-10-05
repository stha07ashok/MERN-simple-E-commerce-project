//const express = require("express"); traditonal way to import express
import express from "express"; //modern way to import express
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/products", productRoutes);

//combining frontend to backend at same port
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//building a port for backend
app.listen(PORT, () => {
  connectDB();
  console.log("server started at port 5000");
});
