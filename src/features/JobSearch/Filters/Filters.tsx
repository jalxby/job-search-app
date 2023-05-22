import React, { FormEvent } from "react";
import {
  Button,
  createStyles,
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

export const Filters = () => {
  const { classes } = useStyles();
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
    <div className={classes.container}>
      <Paper className={classes.wrapper}>
        <form onSubmit={onSubmit()} onReset={onReset}>
          <Flex className={classes.titleAndReset}>
            <Title className={classes.title} order={4}>
              {"Фильтры"}
            </Title>
            <Button className={classes.reset} type={"reset"}>
              {"Сбросить все х"}
            </Button>
          </Flex>
          <Title className={classes.filtersTitle} order={5}>
            {"Отрасль"}
          </Title>

          <Select
            data-elem="industry-select"
            placeholder="Выберите Отрасль"
            rightSection={<IconChevronDown size="1rem" />}
            rightSectionWidth={30}
            styles={{
              item: {
                whiteSpace: "initial",
                borderRadius: "8px",
              },
            }}
            data={industryList}
            {...form.getInputProps("industry")}
          />
          <Title className={classes.filtersTitle} order={5}>
            {"Оклад"}
          </Title>
          <NumberInput
            data-elem="salary-from-input"
            placeholder="От"
            {...form.getInputProps("payment_from")}
            sx={{ paddingBottom: "8px" }}
          />
          <NumberInput
            data-elem="salary-to-input"
            sx={{ paddingBottom: "20px" }}
            placeholder="До"
            {...form.getInputProps("payment_to")}
          />
          <Button sx={{ borderRadius: "8px" }} w={"100%"} type={"submit"}>
            {"Применить"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {},
  wrapper: {
    maxWidth: 315,
    padding: 20,
    border: "1px solid #EAEBED",
    borderRadius: 12,
  },
  reset: {
    border: "none",
    color: "#ACADB9",
    background: "none",
    ":hover": { background: "none", color: `#92C1FF` },
    ":active": { color: `#5E96FC` },
  },
  titleAndReset: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "20px",
  },
  filtersTitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "19px",
    paddingBottom: "8px",
    paddingTop: "20px",
  },
}));
