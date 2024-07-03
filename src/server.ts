import express from "express";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
