import React from "react";
import {
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const Filters = () => {
  return (
    <>
      <Container m={0} p={0} size={"xs"}>
        <Paper
          w={300}
          p={20}
          style={{
            border: "1px solid ",
            borderColor: "#EAEBED",
            borderRadius: 15,
          }}
        >
          <Group>
            <h5>{"Фильтры"}</h5>
            <Button>{"Сбросить все х"}</Button>
          </Group>

          <p>{"Отрасль"}</p>
          <Select
            placeholder="Выберите Отрасль"
            rightSection={<IconChevronDown size="1rem" />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none" } }}
            data={["React", "Angular", "Svelte", "Vue"]}
          />
          <p>{"Оклад"}</p>
          <NumberInput placeholder="От" />
          <NumberInput placeholder="До" />
          <Button w={"100%"}>{"Применить"}</Button>
        </Paper>
      </Container>
    </>
  );
};

export default Filters;
