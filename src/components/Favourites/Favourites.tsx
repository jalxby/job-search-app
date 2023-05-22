import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import JobItem from "../JobItem";
import { getFavouritesTC } from "../../features/JobSearch/joblist-reducer";
import EmptyState from "../EmptyState/EmptyState";
import { Container, Loader, Stack } from "@mantine/core";

const Favourites = () => {
  const favouriteObjects = useAppSelector(
    (state) => state.jobs.favouriteObjects
  );
  const isAppLoading = useAppSelector((state) => state.app.status);
  const dispatch = useAppDispatch();
  const favouriteObjectsIDS = useAppSelector(
    (state) => state.jobs.favouriteObjectsIDS
  );
  const favourites = favouriteObjects.map((f) => (
    <JobItem key={f.id} item={f} />
  ));

  useEffect(() => {
    dispatch(getFavouritesTC(favouriteObjectsIDS));
  }, [dispatch, favouriteObjectsIDS]);
  if (favouriteObjectsIDS.length === 0) {
    return <EmptyState showButton={true} />;
  }

  return (
    <>
      <Container sx={{ margin: "0 auto", padding: 0, width: "1200px" }}>
        <Stack pt={15} pb={20}>
          {isAppLoading === "loading" ? (
            <Loader size={"xl"} style={{ margin: "0 auto" }} />
          ) : (
            favourites
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Favourites;
