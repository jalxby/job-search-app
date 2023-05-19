import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  MantineProvider,
} from "@mantine/core";
import Filters from "../features/JobSearch/Filters/Filters";
import JobList from "../components/JobList";
import { useEffect } from "react";
import { jobAPI } from "../api/api";
import { useAppDispatch } from "./store";
import { getJobsTC } from "../features/JobSearch/joblist-reducer";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getJobsTC());
  }, []);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Container size={"xl"}>{"HI!"}</Container>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
      >
        <Container size={"xl"}>
          <Group spacing={"xl"} align={"stretch"}>
            <Filters />
            <JobList />
          </Group>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}
