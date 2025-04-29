import express from "express";
import dotenv from "dotenv";
import { productController } from "./controllers/productController.js";
import { dbcontroller } from "./controllers/dbController.js";
import { userController } from "./controllers/userController.js";
import { authController } from "./controllers/authController.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 4242;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(dbcontroller)
app.use(userController)
app.use(authController)
app.use(productController)

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

app.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`);
});
