// Импорт необходимых компонентов из Chakra UI
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import {useState} from "react";

// Импорт хранилища продуктов
import {useProductStore} from "../store/product";

const CreatePage = () => {
  // Состояние для хранения данных нового продукта
  const [newProduct, setNewProduct] = useState({
    name: "",       // Название продукта
    price: "",      // Цена (хранится как строка для Input)
    image: "",      // URL изображения продукта
  });

  // Хук для показа уведомлений
  const toast = useToast();

  // Получаем функцию создания продукта из хранилища
  const {createProduct} = useProductStore();

  // Обработчик добавления нового продукта
  const handleAddProduct = async () => {
    // Вызов функции создания продукта и получение результата
    const {success, message} = await createProduct(newProduct);

    // Показ уведомления в зависимости от результата
    if (!success) {
      // Уведомление об ошибке
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      // Уведомление об успехе
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }

    // Сброс формы после добавления
    setNewProduct({name: "", price: "", image: ""});
  };

  return (
    // Контейнер с максимальной шириной
    <Container maxW={"container.sm"}>
      {/* Вертикальный стек с отступами между элементами */}
      <VStack spacing={8}>
        {/* Заголовок страницы */}
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
        >
          Создать новый продукт
        </Heading>

        {/* Карточка для формы */}
        <Box
          w={"full"}
          // Адаптивный цвет фона для светлой и темной темы
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"} // Тень для эффекта "поднятости"
        >
          {/* Вертикальный стек для полей формы */}
          <VStack spacing={4}>
            {/* Поле для названия продукта */}
            <Input
              placeholder='Название продукта'
              name='name'
              value={newProduct.name}
              focusBorderColor='purple.500' // Цвет рамки при фокусе
              onChange={(e) => setNewProduct({
                ...newProduct,
                name: e.target.value
              })}
            />

            {/* Поле для цены с типом number */}
            <Input
              placeholder='Цена'
              name='price'
              type='number'
              value={newProduct.price}
              focusBorderColor='purple.500'
              onChange={(e) => setNewProduct({
                ...newProduct,
                price: e.target.value
              })}
            />

            {/* Поле для ссылки на изображение */}
            <Input
              placeholder='Ссылка на изображение продукта'
              name='image'
              value={newProduct.image}
              focusBorderColor='purple.500'
              onChange={(e) => setNewProduct({
                ...newProduct,
                image: e.target.value
              })}
            />

            {/* Кнопка добавления продукта */}
            <Button
              colorScheme='purple' // Цветовая схема кнопки
              onClick={handleAddProduct}
              w='full' // Ширина 100%
            >
              Добавить продукт
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;