import bodyParser from "body-parser";
import express from "express";
import authRouter from "./apps/auth.js";

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.get("/trips", (req, res) => {
  res.send("Attractions Data");
});

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
