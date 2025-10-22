import express from "express";
import dotenv from "dotenv";
import path from "path";

import {connectDB} from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
// Установка порта из переменных окружения или 5000 по умолчанию
const PORT = process.env.PORT || 5000;

// Получение текущей директории
const __dirname = path.resolve();


app.use(express.json()); // позволяет нам принимать данные в формате JSON в теле запроса

// Подключение маршрутов для API продуктов
app.use("/api/products", productRoutes);

// Настройка для production режима - обслуживание статических файлов фронтенда
if (process.env.NODE_ENV === "production") {
  // Раздача статических файлов из папки dist
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // Обработка всех GET запросов - возврат index.html для SPA
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// Запуск сервера на указанном порту
app.listen(PORT, () => {
  connectDB();
  console.log("Сервер запущен: http://localhost:" + PORT);
});