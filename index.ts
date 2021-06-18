import express from "express";
import { initializeFlagRouter } from "./routes/FlagRouter";

const app = express();

app.use(express.json());
app.use("/flags", initializeFlagRouter());

app.listen(3000);
