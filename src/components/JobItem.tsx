import React from "react";
import { Flex, Paper, Text, Title } from "@mantine/core";
import {
  IconMapPin,
  IconPointFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import { useAppSelector } from "../app/store";

type PropsType = {
  id: number;
};
const JobItem = (props: PropsType) => {
  const job = useAppSelector(
    (state) => state.jobs.objects.filter((j) => j.id === props.id)[0]
  );
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
            {job.profession}
          </Title>
          {/*condition rendering*/}
          {/*<IconStar style={{ color: `#ACADB9` }} />*/}
          <IconStarFilled style={{ color: `#5E96FC` }} />
        </Flex>
        <Flex align={"center"}>
          <Text fw={500}>{job.payment_from}</Text>
          <IconPointFilled style={{ color: `#7B7C88`, height: 15 }} />
          <Text>{job.type_of_work.title}</Text>
        </Flex>
        <Flex columnGap={10}>
          <IconMapPin style={{ color: `#ACADB9` }} />
          <Text>{job.town.title}</Text>
        </Flex>
      </Paper>
    </>
  );
};

export default JobItem;
