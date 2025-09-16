import express from "express";
import cors from "cors";

import userRouter from './src/routes/userRoute.js';
import {connectDatabase} from "./src/models/database.js";

const app = express();
const PORT = 3010;

// Allow all origins (for dev)
app.use(cors());

app.use(express.json()); // parsing the request as json

connectDatabase();

app.use("/user", userRouter);


app.get("/api", (req, res) => {
    console.log('req.server', JSON.stringify(req.body));
    res.status(201).json({"app":"express running app"});
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});