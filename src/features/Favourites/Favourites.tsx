import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import JobItem from "../../components/JobItem";
import { getFavouritesTC } from "../JobSearch/joblist-reducer";

const Favourites = () => {
  const favourites = useAppSelector((state) => state.jobs.favouriteObjects);
  const dispatch = useAppDispatch();
  const favouriteObjectsIDS = useAppSelector(
    (state) => state.jobs.favouriteObjectsIDS
  );
  console.log(favouriteObjectsIDS);
  console.log(favourites);
  useEffect(() => {
    dispatch(getFavouritesTC(favouriteObjectsIDS));
  }, [dispatch, favouriteObjectsIDS]);
  return (
    <div>
      {favourites.map((f) => (
        <JobItem key={f.id} item={f} />
      ))}
    </div>
  );
};

export default Favourites;
