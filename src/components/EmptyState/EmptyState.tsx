import React from "react";
import nothingFound from "../../assets/nothingfound.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import s from "./EmtyState.module.scss";

type PropsType = {
  showButton: boolean;
};
const EmptyState = (props: PropsType) => {
  let navigate = useNavigate();
  return (
    <div className={s.container}>
      <img className={s.image} src={nothingFound} alt="nothingFound" />
      <text className={s.message}>{"Упс, здесь еще ничего нет!"}</text>
      {props.showButton && (
        <Button onClick={() => navigate("/")} className={s.button}>
          <text className={s.buttonText}>{"Поиск вакансий"}</text>
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
