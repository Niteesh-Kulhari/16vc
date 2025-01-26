import express from "express";
import itemRouter from "./routes/item.routes"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/items", itemRouter);



app.listen(PORT, ()=> {
    console.log(`Server is running on port - ${PORT}`);
})