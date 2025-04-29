import express from "express";
import { UserModel } from "../models/userModel.js";
import { Authorize } from "../utils/AuthUtils.js";

//Opretter en router
export const userController = express.Router();

//READ: route til at hente data
userController.get("/users", async (req, res) => {
  try {
    let data = await UserModel.findAll();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Ingen data fundet" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).send({ message: `Fejl i kald af model: ${error.message}` });
  }
});

//CREATE: Route til oprette
userController.post("/users", async (req, res) => {
  const { firstname, lastname, email, password, refresh_token, is_active } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !password ||
    !email ||
    !refresh_token ||
    !is_active
  ) {
    return res.status(404).json({ message: "Alle felter skal sendes med" });
  }

  console.log(req.body);

  try {
    const data = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
      is_active,
      refresh_token,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Fejl ved oprettelse", error);
    res.status(500).send({
      message: `Fejl i oprettelse af model: ${error.message}`,
    });
  }
});
