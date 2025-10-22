import express from "express";

import {
  createProduct, deleteProduct, getProducts, updateProduct
} from "../controllers/product.controller.js";

// Создание экземпляра роутера Express
const router = express.Router();

// Определение маршрутов API для операций CRUD с продуктами

// GET /api/products - получение списка всех продуктов
router.get("/", getProducts);

// POST /api/products - создание нового продукта
router.post("/", createProduct);

// PUT /api/products/:id - обновление продукта по ID
router.put("/:id", updateProduct);

// DELETE /api/products/:id - удаление продукта по ID
router.delete("/:id", deleteProduct);

export default router;