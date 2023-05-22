import React, { useEffect } from "react";
import s from "./Main.module.scss";
import { Route, Routes } from "react-router-dom";
import JobList from "../JobList/JobList";
import Favourites from "../Favourites/Favourites";
import SelectedJobPage from "../../features/SelectedJob/SelectedJobPage";
import EmptyState from "../EmptyState/EmptyState";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  getIndustryListTC,
  getJobsTC,
} from "../../features/JobSearch/joblist-reducer";

const Main = () => {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector((state) => state.jobs.searchParams);

  useEffect(() => {
    dispatch(getJobsTC(searchParams));
    dispatch(getIndustryListTC());
  }, [dispatch, searchParams]);
  return (
    <div className={s.main}>
      <div className={s.container}>
        <Routes>
          <Route path={"/job-search-app"} element={<JobList />} />
          <Route path={"/favourites"} element={<Favourites />} />
          <Route path={"/description/:id"} element={<SelectedJobPage />} />
          <Route path={"/empty"} element={<EmptyState showButton={true} />} />
          <Route path={"/*"} element={<EmptyState showButton={true} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
