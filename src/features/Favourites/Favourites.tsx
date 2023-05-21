import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import JobItem from "../../components/JobItem";
import { getFavouritesTC } from "../JobSearch/joblist-reducer";
import EmptyState from "../../components/EmptyState/EmptyState";

const Favourites = () => {
  const favourites = useAppSelector((state) => state.jobs.favouriteObjects);
  const dispatch = useAppDispatch();
  const favouriteObjectsIDS = useAppSelector(
    (state) => state.jobs.favouriteObjectsIDS
  );

  useEffect(() => {
    dispatch(getFavouritesTC(favouriteObjectsIDS));
  }, [favouriteObjectsIDS]);
  if (favouriteObjectsIDS.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {favourites.map((f) => (
        <JobItem key={f.id} item={f} />
      ))}
    </div>
  );
};

export default Favourites;
