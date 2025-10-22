// Импорт иконок и компонентов из Chakra UI
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
// Импорт хранилища продуктов для управления состоянием
import {useProductStore} from "../store/product";
import {useState} from "react";

const ProductCard = ({product}) => {
  // Состояние для хранения обновленных данных продукта
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Динамические цвета в зависимости от темы (светлая/темная)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  // Получение функций из хранилища продуктов
  const {deleteProduct, updateProduct} = useProductStore();
  // Хук для показа уведомлений
  const toast = useToast();
  // Хук для управления состоянием модального окна
  const {isOpen, onOpen, onClose} = useDisclosure();

  // Функция форматирования цены в русский формат
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  // Обработчик удаления продукта
  const handleDeleteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);
    if (!success) {
      // Показ уведомления об ошибке
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Показ уведомления об успехе
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Обработчик обновления продукта
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    onClose(); // Закрытие модального окна после операции
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Продукт успешно обновлен",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    // Карточка продукта с эффектами при наведении
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden' // Скрытие выходящего за границы контента
      transition='all 0.3s'
      _hover={{
        transform: "translateY(-5px)", // Подъем карточки при наведении
        shadow: "xl" // Увеличение тени при наведении
      }}
      bg={bg}
    >
      {/* Изображение продукта */}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w='full'
        objectFit='cover' // Обрезка изображения для заполнения контейнера
      />

      {/* Контент карточки */}
      <Box p={4}>
        {/* Название продукта */}
        <Heading
          as='h3'
          size='md'
          mb={2}
        >
          {product.name}
        </Heading>
        {/* Цена продукта с форматированием */}
        <Text
          fontWeight='bold'
          fontSize='xl'
          color={textColor}
          mb={4}
        >
          {formatPrice(product.price)} ₽
        </Text>

        {/* Горизонтальный стек для кнопок действий */}
        <HStack spacing={2}>
          {/* Кнопка редактирования */}
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen} // Открытие модального окна
            colorScheme='purple'
          />
          {/* Кнопка удаления */}
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme='red'
          />
        </HStack>
      </Box>

      {/* Модальное окно для редактирования продукта */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay /> {/* Полупрозрачный оверлей */}

        <ModalContent>
          <ModalHeader>Обновить продукт</ModalHeader>
          <ModalCloseButton /> {/* Кнопка закрытия */}

          <ModalBody>
            {/* Вертикальный стек для полей формы */}
            <VStack spacing={4}>
              {/* Поле для названия продукта */}
              <Input
                placeholder='Название продукта'
                name='name'
                value={updatedProduct.name}
                focusBorderColor='purple.500' // Цвет рамки при фокусе
                onChange={(e) => setUpdatedProduct({
                  ...updatedProduct,
                  name: e.target.value
                })}
              />
              {/* Поле для цены */}
              <Input
                placeholder='Цена'
                name='price'
                type='number'
                value={updatedProduct.price}
                focusBorderColor='purple.500'
                onChange={(e) => setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value
                })}
              />
              {/* Поле для ссылки на изображение */}
              <Input
                placeholder='Ссылка на изображение продукта'
                name='image'
                value={updatedProduct.image}
                focusBorderColor='purple.500'
                onChange={(e) => setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value
                })}
              />
            </VStack>
          </ModalBody>

          {/* Футер модального окна с кнопками действий */}
          <ModalFooter>
            <Button
              colorScheme='purple'
              mr={3} // Отступ справа
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Обновить
            </Button>
            <Button
              variant='ghost'
              onClick={onClose}
            >
              Отменить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;