import React from "react";
import { Container, Pagination, Stack } from "@mantine/core";
import Search from "../features/JobSearch/Search";
import JobItem from "./JobItem";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setPageTC } from "../features/JobSearch/joblist-reducer";
import Filters from "../features/JobSearch/Filters/Filters";
import EmptyState from "./EmptyState/EmptyState";

const JobList = () => {
  const jobs = useAppSelector((state) => state.jobs.objects);
  const currentPage = useAppSelector((state) => state.jobs.currentPage);
  const pagesTotal = useAppSelector((state) => state.jobs.pagesTotal);

  const dispatch = useAppDispatch();
  const changePage = (p: number) => {
    dispatch(setPageTC(p));
  };

  return (
    <>
      <Filters />
      <Container p={0} m={0} w={"100%"} h={"100%"} sx={{}}>
        <Search />
        <Stack pt={16} pb={20} h={"100%"}>
          {jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {jobs.map((job) => (
                <JobItem key={job.id} item={job} />
              ))}
              <Pagination
                onChange={changePage}
                value={currentPage}
                total={pagesTotal}
                sx={{
                  justifyContent: "center",
                }}
              />
            </>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default JobList;
