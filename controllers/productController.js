import express from "express";
import { ProductModel } from "../models/productModel.js";
import { Authorize } from "../utils/AuthUtils.js";

// Opretter en router
export const productController = express.Router();

// READ: Route til at hente liste
productController.get("/products", async (req, res) => {
  try {
    let data = await ProductModel.findAll();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).send({
      message: `Fejl i kald af model ${error.message}`,
    });
  }
});

// READ: Route til at hente et produkt
productController.get("/product/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    let data = await ProductModel.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).send({
      message: `Fejl i kald af model ${error.message}`,
    });
  }
});

// CREATE: Route til at oprette
productController.post("/products", Authorize, async (req, res) => {
  const { name, stock, price, amountSold } = req.body;
  if (!name || !stock || !price || !amountSold) {
    return res.status(400).json({ message: "Alle felter skal sendes med" });
  }

  try {
    const data = await ProductModel.create({
      name,
      stock,
      price,
      amountSold,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Fejl i oprettelse", error);
    res.status(500).send({ message: `Fejl i oprettelse af model: ${error.message}` });
  }
});

// UPDATE: Route til at opdatere
productController.put("/products/:id", Authorize, async (req, res) => {
  const { name, stock, price, amountSold } = req.body;
  const { id } = req.params;

  try {
    const data = await ProductModel.update(
      { name, stock, price, amountSold },
      { where: { id: id } }
    );

    if (data[0] > 0) {
      res.status(200).send({ message: "Item opdateret succesfuldt" });
    } else {
      res.status(404).send({ message: "Item ikke fundet" });
    }
  } catch (error) {
    res.status(500).send({ message: `Fejl ved opdatering af model: ${error.message}` });
  }
});

// DELETE: Route til at slette
productController.delete("/products/:id", Authorize, async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      await ProductModel.destroy({
        where: { id: id },
      });

      res.status(200).send({ message: "Rækken er slettet" });
    } catch (error) {
      res.status(500).send({
        message: `Kunne ikke slette item: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id ugyldigt",
    });
  }
});
