import React from "react";
import { Paper } from "@mantine/core";

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
        }}
      ></Paper>
    </>
  );
};

export default JobItem;
