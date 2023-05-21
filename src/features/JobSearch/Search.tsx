import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Button, Input } from "@mantine/core";
import { useAppDispatch } from "../../app/store";
import { applySearchTC } from "./joblist-reducer";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(applySearchTC(value));
    setValue("");
  };
  return (
    <Input
      w={"100%"}
      icon={<IconSearch size="1rem" />}
      placeholder="Введите название вакансии"
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      rightSection={
        <Button right={20} size={"xs"} onClick={onClick}>
          {"Поиск"}
        </Button>
      }
    />
  );
};

export default Search;
