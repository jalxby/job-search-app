import React from "react";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";

type NavLinkProps = {
  isActive: boolean;
};
const Header = () => {
  const naviStyle = ({ isActive }: NavLinkProps) =>
    isActive ? s.active : s.pending;
  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <div className={s.image}>
            <div className={s.eclipseOne}></div>
            <div className={s.eclipseTwo}></div>
          </div>
          <div className={s.text}>{"Jobored"}</div>
        </div>
        <div className={s.navigation}>
          <NavLink className={naviStyle} to={"/job-search-app/"}>
            Поиск вакансий
          </NavLink>
          <NavLink className={naviStyle} to={"/favourites"}>
            Избранное
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
