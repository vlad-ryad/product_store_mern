import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Получить все продукты
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Найти все продукты в базе
    res.status(200).json({ success: true, data: products }); // Вернуть успешный ответ с данными
  } catch (error) {
    console.log("Ошибка при получении продуктов:", error.message);
    res.status(500).json({ success: false, message: "Ошибка сервера" }); // Ошибка сервера
  }
};

// Создать продукт
export const createProduct = async (req, res) => {
  const product = req.body; // Данные из тела запроса

  // Проверка заполнения всех обязательных полей
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Пожалуйста, заполните все поля" });
  }

  const newProduct = new Product(product); // Создание нового документа продукта

  try {
    await newProduct.save(); // Сохранение в базу данных
    res.status(201).json({ success: true, data: newProduct }); // Успешное создание
  } catch (error) {
    console.error("Ошибка при создании продукта:", error.message);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

// Обновить продукт
export const updateProduct = async (req, res) => {
  const { id } = req.params; // ID из параметров URL
  const product = req.body; // Новые данные продукта

  // Проверка валидности ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Неверный ID продукта" });
  }

  try {
    // Найти и обновить продукт, вернуть обновленную версию
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

// Удалить продукт
export const deleteProduct = async (req, res) => {
  const { id } = req.params; // ID из параметров URL

  // Проверка валидности ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Неверный ID продукта" });
  }

  try {
    await Product.findByIdAndDelete(id); // Удалить продукт по ID
    res.status(200).json({ success: true, message: "Продукт удален" });
  } catch (error) {
    console.log("Ошибка при удалении продукта:", error.message);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};