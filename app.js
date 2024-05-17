import express from "express";
import cors from "cors";
import admin from "./src/routes/admin.js";
import public_route from "./src/routes/public.js";
import auth from "./src/routes/auth.js";
import user from "./src/routes/user.js";
import bodyparser from "body-parser";
import ErrorHandler from "./src/middleware/errorHandler.js";
export const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));
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


app.use("/admin", admin);
app.use("/public", public_route);
app.use("/auth", auth);
app.use("/user", user);


app.use(ErrorHandler);
