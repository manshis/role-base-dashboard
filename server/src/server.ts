import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./services/database.service";
import usersRouter from "./routes/users.router";
import dashboardRouter from "./routes/dashboard.router";
import maskingMiddleware from "./middlewares/masking.middleware";

dotenv.config();
connectToDatabase();
const app = express();

app.use(maskingMiddleware);
app.use(express.json());
app.use("/api/user", usersRouter);
app.use("/api/dashboard", dashboardRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
