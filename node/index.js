import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: "GET, POST, PUT, PATCH"
}));
app.use(express.json());

// Routes
app.use("/", profileRoutes);

// Ensure database is connected before starting server
db.ping((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1); // Exit if database connection is not working
    } else {
        console.log("Database connection verified.");

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});
