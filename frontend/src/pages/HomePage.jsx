import React, {Component, useEffect} from 'react';
import {Container, VStack, Text, SimpleGrid} from "@chakra-ui/react";
// Импорт компонента для навигации между страницами
import {Link} from "react-router-dom";
// Импорт хранилища продуктов
import {useProductStore} from "../store/product.js";
// Импорт компонента карточки продукта
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  // Получаем функции и состояние из хранилища продуктов
  const {fetchProducts, products} = useProductStore();

  // Эффект для загрузки продуктов при монтировании компонента
  useEffect(() => {
    fetchProducts(); // Вызов API для получения списка продуктов
  }, [fetchProducts]); // Зависимость - функция fetchProducts

  // Логирование продуктов в консоль для отладки
  console.log(products);

  return (
    // Основной контейнер страницы с максимальной шириной и вертикальными отступами
    <Container
      maxW='container.xl' // Макс ширина - extra large
      py={12} // Вертикальный padding (top и bottom)
    >
      {/* Вертикальный стек для расположения элементов в колонку */}
      <VStack spacing={8}>
        {/* Заголовок страницы с градиентным текстом */}
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, purple.400, purple.600)"}
          bgClip={"text"} // Обрезка фона по тексту (создает градиентный текст)
          textAlign={"center"} // Выравнивание по центру
        >
          Текущие продукты
        </Text>

        {/* Сетка для отображения карточек продуктов */}
        <SimpleGrid
          columns={{
            base: 1,   // 1 колонка на мобильных устройствах
            md: 2,     // 2 колонки на средних экранах
            lg: 3,     // 3 колонки на больших экранах
          }}
          spacing={10} // Отступ между элементами сетки
          w={"full"}
        >
          {/* Маппинг массива продуктов в компоненты ProductCard */}
          {products.map((product) => (
            <ProductCard
              key={product._id} // Уникальный ключ для React  ID
              product={product} // Передача данных продукта в компонент карточки
            />
          ))}
        </SimpleGrid>

        {/* Условный рендеринг: показывается когда продуктов нет */}
        {products.length === 0 && (
          <Text
            fontSize='xl'        // Extra large размер шрифта
            textAlign={"center"} // Выравнивание по центру
            fontWeight='bold'    // Жирное начертание
            color='gray.500'     // Серый цвет текста
          >
            Товары не найдены 😢{" "}
            {/* Ссылка на страницу создания товара */}
            <Link to={"/create"}>
              <Text
                as='span' // Рендерится как span элемент
                color='purple.400'
                _hover={{textDecoration: "underline"}} // Подчеркивание при наведении
              >
                Создать товар
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;