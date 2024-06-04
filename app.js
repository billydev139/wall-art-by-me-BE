import express from "express";
import cors from "cors";
import admin from "./src/routes/admin.js";
import public_route from "./src/routes/public.js";
import auth from "./src/routes/auth.js";
import user from "./src/routes/user.js";
import payment from "./src/routes/payment.js";
import bodyparser from "body-parser";
import ErrorHandler from "./src/middleware/errorHandler.js";
export const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend domain
  methods: "GET, POST, PUT, DELETE,PATCH,OPTIONS,HEAD",
  allowedHeaders: ["Content-Type", "Authorization"], // Uncomment and use if needed
  credentials: true, // If you need to include credentials
};

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(
  bodyparser.json({
    limit: "50mb",
  })
);

app.use(cors(corsOptions));

app.use("/admin", admin);
app.use("/public", public_route);
app.use("/auth", auth);
app.use("/user", user);
app.use("/payment", payment);

app.use(ErrorHandler);
