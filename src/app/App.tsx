import {
  AppShell,
  Container,
  Group,
  Header,
  MantineProvider,
} from "@mantine/core";
import Filters from "../features/JobSearch/Filters/Filters";
import JobList from "../components/JobList";

import React, { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Favourites from "../features/Favourites/Favourites";
import {
  getFavouritesTC,
  getIndustryListTC,
  getJobsTC,
} from "../features/JobSearch/joblist-reducer";
import { useAppDispatch, useAppSelector } from "./store";

export default function App() {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector((state) => state.jobs.searchParams);

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
            <Container size={"xl"}>
              <NavLink to={"/search"}>search</NavLink>
              <NavLink to={"/favourites"}>favourites</NavLink>
            </Container>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
      >
        <Container size={"xl"}>
          <Group spacing={"xl"} align={"stretch"}>
            <Filters />
            <Routes>
              <Route path={"/search"} element={<JobList />} />
              <Route path={"/favourites"} element={<Favourites />} />
            </Routes>
          </Group>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}
