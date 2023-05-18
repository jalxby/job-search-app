import React from "react";
import { Flex, Paper, Text, Title } from "@mantine/core";
import {
  IconMapPin,
  IconPointFilled,
  IconStarFilled,
} from "@tabler/icons-react";

const JobItem = () => {
  return (
    <>
      <Paper
        w={"100%"}
        p={20}
        sx={{
          height: "140px",
          border: "1px solid ",
          borderColor: "#EAEBED",
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Flex justify={"space-between"}>
          <Title color={`#5E96FC`} order={3}>
            {"Job title"}
          </Title>
          {/*condition rendering*/}
          {/*<IconStar style={{ color: `#ACADB9` }} />*/}
          <IconStarFilled style={{ color: `#5E96FC` }} />
        </Flex>
        <Flex align={"center"}>
          <Text fw={500}>{"з/п от 29000"}</Text>
          <IconPointFilled style={{ color: `#7B7C88`, height: 15 }} />
          <Text>{"Полный рабочий день"}</Text>
        </Flex>
        <Flex columnGap={10}>
          <IconMapPin style={{ color: `#ACADB9` }} />
          <Text>{"Минск"}</Text>
        </Flex>
      </Paper>
    </>
  );
};

export default JobItem;
