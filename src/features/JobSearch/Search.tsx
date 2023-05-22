import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Button, Input } from "@mantine/core";
import { useAppDispatch } from "../../app/store";
import { applySearchTC } from "./joblist-reducer";
import s from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(applySearchTC(value));
    setValue("");
  };
  return (
    <Input
      data-elem="search-input"
      className={s.input}
      w={"100%"}
      icon={<IconSearch size="1rem" />}
      placeholder="Введите название вакансии"
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      rightSection={
        <Button
          data-elem="search-button"
          className={s.buttonSearch}
          size={"xs"}
          onClick={onClick}
        >
          {"Поиск"}
        </Button>
      }
    />
  );
};

export default Search;
