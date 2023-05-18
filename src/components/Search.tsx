import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { Button, Input } from "@mantine/core";

const Search = () => {
  return (
    <Input
      w={"100%"}
      icon={<IconSearch size="1rem" />}
      placeholder="Введите название вакансии"
      rightSection={
        <Button right={20} size={"xs"}>
          {"Поиск"}
        </Button>
      }
    />
  );
};

export default Search;
