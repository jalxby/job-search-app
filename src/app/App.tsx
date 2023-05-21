import {
  AppShell,
  Container,
  Group,
  Header,
  MantineProvider,
} from "@mantine/core";
import JobList from "../components/JobList";

import React, { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Favourites from "../features/Favourites/Favourites";
import {
  getIndustryListTC,
  getJobsTC,
} from "../features/JobSearch/joblist-reducer";
import { useAppDispatch, useAppSelector } from "./store";
import SelectedJobPage from "../features/SelectedJob/SelectedJobPage";
import EmptyState from "../components/EmptyState/EmptyState";
import s from "./App.module.scss";

type NavLinkProps = {
  isActive: boolean;
};

export default function App() {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector((state) => state.jobs.searchParams);

  const naviStyle = ({ isActive }: NavLinkProps) =>
    isActive ? s.active : s.pending;

  useEffect(() => {
    dispatch(getJobsTC(searchParams));
    dispatch(getIndustryListTC());
  }, []);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Container className={s.container} size={"xl"}>
              <div className={s.logo}>
                <div className={s.image}>
                  <div className={s.eclipseOne}></div>
                  <div className={s.eclipseTwo}></div>
                </div>
                <div className={s.text}>{"Jobored"}</div>
              </div>
              <div className={s.navigation}>
                <NavLink className={naviStyle} to={"/search"}>
                  Поиск вакансий
                </NavLink>
                <NavLink className={naviStyle} to={"/favourites"}>
                  Избранное
                </NavLink>
              </div>
            </Container>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
      >
        <Container size={"xl"}>
          <Group spacing={"xl"} align={"stretch"}>
            <Routes>
              <Route path={"/search"} element={<JobList />} />
              <Route path={"/favourites"} element={<Favourites />} />
              <Route path={"/description/:id"} element={<SelectedJobPage />} />
              <Route path={"/empty"} element={<EmptyState />} />
            </Routes>
          </Group>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}
