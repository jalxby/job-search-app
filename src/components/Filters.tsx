import React from "react";
import {
  Button,
  Container,
  Flex,
  NumberInput,
  Paper,
  Select,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const Filters = () => {
  return (
    <>
      <Container m={0} p={0} size={"xs"}>
        <Paper
          w={300}
          p={20}
          sx={{
            border: "1px solid #EAEBED",
            borderRadius: 15,
          }}
        >
          <Flex justify={"space-between"} align={"center"}>
            <Title order={4}>{"Фильтры"}</Title>
            <Button
              sx={{
                border: "none",
                color: "#ACADB9",
                background: "none",
                ":hover": { background: "none" },
              }}
            >
              {"Сбросить все х"}
            </Button>
          </Flex>

          <Title order={5}>{"Отрасль"}</Title>
          <Select
            placeholder="Выберите Отрасль"
            rightSection={<IconChevronDown size="1rem" />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none" } }}
            data={["React", "Angular", "Svelte", "Vue"]}
          />
          <Title order={5}>{"Оклад"}</Title>
          <NumberInput placeholder="От" />
          <NumberInput placeholder="До" />
          <Button w={"100%"}>{"Применить"}</Button>
        </Paper>
      </Container>
    </>
  );
};

export default Filters;
