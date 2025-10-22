// Импорт Mongoose для работы с MongoDB
import mongoose from "mongoose";

// Функция для подключения к базе данных MongoDB
export const connectDB = async () => {
  try {
    // Подключение к MongoDB используя URL из переменных окружения
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // Успешное подключение - вывод информации о хосте
    console.log(`MongoDB Подключена: ${conn.connection.host}`);
  } catch (error) {
    // Обработка ошибки подключения
    console.error(`Ошибка: ${error.message}`);

    // Завершение процесса с кодом ошибки 1
    process.exit(1); // 1 = ошибка, 0 = успех
  }
};