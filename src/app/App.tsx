import {
  AppShell,
  Container,
  Group,
  Header,
  MantineProvider,
} from "@mantine/core";
import Filters from "../components/Filters";
import JobList from "../components/JobList";

export default function App() {
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
