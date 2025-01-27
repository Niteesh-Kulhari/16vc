import express from "express";
import itemRouter from "./routes/item.routes"

const app = express();

app.use(express.json());
app.use("/api/items", itemRouter);

export default app;