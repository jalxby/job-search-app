import React, { FormEvent } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useForm } from "@mantine/form";
import { applyFilterTC } from "../joblist-reducer";
import JobList from "../../../components/JobList";
import { Route } from "react-router-dom";

const Filters = () => {
  const form = useForm({
    initialValues: {
      industry: "",
      payment_from: 0,
      payment_to: 0,
    },
  });

  const industries = useAppSelector((state) => state.jobs.industryList);
  const industryList = industries.map((i) => i.title_rus);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    return form.onSubmit((values) => {
      dispatch(applyFilterTC(values));
    });
  };

  const onReset = (event: FormEvent<HTMLFormElement>) => {
    form.onReset(event);
  };

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
          <form onSubmit={onSubmit()} onReset={onReset}>
            <Flex justify={"space-between"} align={"center"}>
              <Title order={4}>{"Фильтры"}</Title>
              <Button
                type={"reset"}
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
              data={industryList}
              {...form.getInputProps("industry")}
            />
            <Title order={5}>{"Оклад"}</Title>
            <NumberInput
              placeholder="От"
              {...form.getInputProps("payment_from")}
            />
            <NumberInput
              placeholder="До"
              {...form.getInputProps("payment_to")}
            />

            <Button w={"100%"} type={"submit"}>
              {"Применить"}
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Filters;
