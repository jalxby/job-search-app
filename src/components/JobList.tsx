import React from "react";
import { Container, Pagination, Stack } from "@mantine/core";
import Search from "./Search";
import JobItem from "./JobItem";

const JobList = () => {
  return (
    <>
      <Container p={0} m={0} w={"100%"} h={"100%"} sx={{}}>
        <Search />
        <Stack pt={16} pb={20} h={"100%"}>
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
          <Pagination
            total={4}
            sx={{
              justifyContent: "center",
            }}
          />
        </Stack>
      </Container>

      {/*</Paper>*/}
    </>
  );
};

export default JobList;
