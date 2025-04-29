import express from "express";
import sequelize from "../config/sequelizeConfig.js";
import { ProductModel } from "../models/productModel.js";
import { UserModel } from "../models/userModel.js";

//Opretter en router
export const dbcontroller = express.Router();

dbcontroller.get("/sync", async (req, res) => {
  try {
    const forceSync = req.query.force === "true";
    const response = await sequelize.sync({ force: forceSync });
    res.send(
      `Data succcessfully synchronized ${
        forceSync ? "with force" : "without force"
      }`
    );
  } catch (error) {
    res.send(error);
  }
});
