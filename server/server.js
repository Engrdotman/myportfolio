import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// ✅ Allow both local + deployed frontend
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://myportfolio-beta-seven-60.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow tools like Postman

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// Main contact routes that perform DB and Mailer logic
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});