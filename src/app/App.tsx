import { MantineProvider } from "@mantine/core";
import React from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import s from "./App.module.scss";

export default function App() {
  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#DEECFF",
            "#C9E0FF",
            "#B7D6FF",
            "#92C1FF",
            "#A5D8FF",
            "#A5D8FF",
            "#5E96FC",
            "#92C1FF", //mover
            "#5E96FC",
            "#A5D8FF",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <div className={s.App}>
        <Header />
        <Main />
      </div>
    </MantineProvider>
  );
}
