import React from "react";
import { Loader, Pagination, Stack } from "@mantine/core";
import Search from "../../features/JobSearch/Search";
import JobItem from "../JobItem";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setPageTC } from "../../features/JobSearch/joblist-reducer";
import EmptyState from "../EmptyState/EmptyState";
import { Filters } from "../../features/JobSearch/Filters/Filters";
import s from "./JobList.module.scss";

const JobList = () => {
  const jobs = useAppSelector((state) => state.jobs.objects);
  const currentPage = useAppSelector((state) => state.jobs.currentPage);
  const pagesTotal = useAppSelector((state) => state.jobs.pagesTotal);

  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector((state) => state.app.status);
  const changePage = (p: number) => {
    dispatch(setPageTC(p));
  };

  return (
    <div className={s.jobList}>
      <Filters />
      <div className={s.jobsSection}>
        <Search />
        <Stack pt={15} pb={20}>
          {isAppLoading === "loading" ? (
            <Loader className={s.loader} size={"xl"} />
          ) : jobs.length === 0 ? (
            <EmptyState showButton={false} />
          ) : (
            <>
              {jobs.map((job) => (
                <JobItem
                  data-elem={`vacancy-${job.id}`}
                  key={job.id}
                  item={job}
                />
              ))}
              <Pagination
                className={s.pagination}
                onChange={changePage}
                value={currentPage}
                total={pagesTotal}
              />
            </>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default JobList;
