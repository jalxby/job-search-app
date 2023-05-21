import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getJobTC } from "../JobSearch/joblist-reducer";
import JobItem from "../../components/JobItem";
import parse from "html-react-parser";
import { Paper } from "@mantine/core";

const SelectedJobPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.jobs.objects.filter((i) => i.id === Number(id))
  );

  useEffect(() => {
    if (id) {
      dispatch(getJobTC(id));
    }
  }, [dispatch, id]);
  return (
    <>
      {item.map((i) => {
        return (
          <div key={i.id}>
            <JobItem item={i} />
            <Paper
              sx={{
                height: "auto",
                border: "1px solid #EAEBED",
                borderRadius: 12,
                background: `#FFFFFF`,
                padding: "24px",
              }}
            >
              {parse(i.vacancyRichText)}
            </Paper>
          </div>
        );
      })}
    </>
  );
};

export default SelectedJobPage;
