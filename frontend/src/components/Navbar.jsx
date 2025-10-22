// Импорт необходимых компонентов из Chakra UI
import {
  Button, Container, Flex, HStack, Text, useColorMode
} from "@chakra-ui/react";
// Импорт компонента для навигации между страницами
import { Link } from "react-router-dom";

// Импорт иконок из Chakra UI и React Icons
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  // Хук для управления цветовой темой (светлая/темная)
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // Контейнер навигационной панели с ограничением максимальной ширины
    <Container
      maxW={"1140px"} // Максимальная ширина контейнера
      px={4} // Горизонтальные отступы
    >
      {/* Flex контейнер для расположения элементов навигации */}
      <Flex
        h={16} // Высота навигационной панели (16 = 4rem)
        alignItems={"center"} // Вертикальное выравнивание по центру
        justifyContent={"space-between"} // Распределение пространства между элементами
        flexDir={{
          base: "column", // На мобильных - вертикальное расположение
          sm: "row",      // На маленьких экранах и выше - горизонтальное
        }}
      >
        {/* Логотип/название магазина */}
        <Text
          fontSize={{
            base: "22", // Размер шрифта на мобильных
            sm: "28"    // Размер шрифта на маленьких экранах и выше
          }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, purple.400, purple.600)"}
          bgClip={"text"}
        >
          {/* Ссылка на главную страницу */}
          <Link to={"/"}>
            Магазин товаров 🛒
          </Link>
        </Text>

        {/* Горизонтальный стек для кнопок действий */}
        <HStack
          spacing={2}
          alignItems={"center"}
        >
          {/* Ссылка на страницу создания товара */}
          <Link to={"/create"}>
            <Button>
              {/* Иконка добавления нового товара */}
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          {/* Кнопка переключения темы (светлая/темная) */}
          <Button onClick={toggleColorMode}>
            {/* Условный рендеринг иконки в зависимости от текущей темы */}
            {colorMode === "light"
              ? <IoMoon />          // Иконка луны для светлой темы
              : <LuSun size='20' /> // Иконка солнца для темной темы
            }
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;