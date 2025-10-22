// Импорт функции создания хранилища Zustand
import {create} from "zustand";

// Создание хранилища для управления состоянием продуктов
export const useProductStore = create((set) => ({
  // Начальное состояние - пустой массив продуктов
  products: [],

  // Функция для прямого установления массива продуктов
  setProducts: (products) => set({products}),

  // Асинхронная функция создания нового продукта
  createProduct: async (newProduct) => {
    // Валидация обязательных полей
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {success: false, message: 'Пожалуйста заполните все поля'};
    }

    // Отправка POST запроса на сервер для создания продукта
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct) // Преобразование объекта в JSON строку
    });

    // Парсинг ответа от сервера
    const data = await res.json();

    // Обновление состояния - добавление нового продукта в массив
    set((state) => ({products: [...state.products, data.data]}));

    // Возврат успешного результата
    return {success: true, message: 'Товар успешно создан'};
  },

  // Асинхронная функция загрузки списка продуктов
  fetchProducts: async () => {
    // Отправка GET запроса на сервер
    const res = await fetch("/api/products");
    const data = await res.json();

    // Обновление состояния всем массивом продуктов
    set({products: data.data});
  },

  // Асинхронная функция удаления продукта
  deleteProduct: async (pid) => {
    // Отправка DELETE запроса на сервер
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    // Проверка успешности операции на сервере
    if (!data.success) return {success: false, message: data.message};

    // обновление UI - немедленное удаление из состояния без F5
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid)
    }));

    return {success: true, message: data.message};
  },

  // Асинхронная функция обновления продукта
  updateProduct: async (pid, updatedProduct) => {
    // Отправка PUT запроса на сервер для обновления
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    // Проверка успешности операции
    if (!data.success) return {success: false, message: data.message};

    // обновление UI - замена старого продукта на обновленный без F5
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return {success: true, message: data.message};
  },
}));