import express from "express";
import cors from "cors";
import public_route from "./src/routes/public.js";
import bodyparser from "body-parser";
export const app = express();
app.use(cors());
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

app.use("/public", public_route);






