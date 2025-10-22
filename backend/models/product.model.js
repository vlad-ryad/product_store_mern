// Импорт Mongoose для работы с MongoDB
import mongoose from "mongoose";

// Определение схемы продукта (структура документа в MongoDB)
const productSchema = new mongoose.Schema({
  name: {
    type: String,      // Тип поля - строка
    required: true,    // Обязательное поле
  },
  price: {
    type: Number,      // Тип поля - число
    required: true,    // Обязательное поле
  },
  image: {
    type: String,      // Тип поля - строка (URL изображения)
    required: true,    // Обязательное поле
  },
}, {
  timestamps: true,    // Автоматически добавляет поля createdAt и updatedAt
});

// Создание модели Product на основе схемы
const Product = mongoose.model("Product", productSchema);

// Экспорт модели для использования в других файлах
export default Product;