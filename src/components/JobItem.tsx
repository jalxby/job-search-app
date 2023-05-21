import React from "react";
import { Flex, Paper, Text, Title } from "@mantine/core";
import {
  IconMapPin,
  IconPointFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { useAppDispatch } from "../app/store";
import {
  addToFavouritesAC,
  ObjectType,
  removeFromFavouritesAC,
} from "../features/JobSearch/joblist-reducer";
import { Link } from "react-router-dom";

type PropsType = {
  item: ObjectType;
};
const JobItem = ({ item, ...props }: PropsType) => {
  let payment;
  const dispatch = useAppDispatch();

  const addToFavourites = () => {
    dispatch(addToFavouritesAC(item.id));
  };
  const removeFromFavourites = () => {
    dispatch(removeFromFavouritesAC(item.id));
  };

  if (item.payment_from && item.payment_to) {
    payment = `з/п от ${item.payment_from} - ${item.payment_to}`;
  }
  if (item.payment_from && !item.payment_to) {
    payment = `з/п от ${item.payment_from}`;
  }
  if (item.payment_to && !item.payment_from) {
    payment = `з/п до ${item.payment_to}`;
  }

  return (
    <>
      <Paper
        w={"100%"}
        p={20}
        sx={{
          height: "auto",
          border: "1px solid ",
          borderColor: "#EAEBED",
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Flex justify={"space-between"}>
          <Title color={`#5E96FC`} order={3}>
            <Text component={Link} to={`/description/${item.id}`}>
              {item.profession}
            </Text>
          </Title>
          <div>
            {item.isFavourite ? (
              <IconStarFilled
                onClick={removeFromFavourites}
                style={{ color: `#5E96FC` }}
              />
            ) : (
              <IconStar
                onClick={addToFavourites}
                style={{ color: `#ACADB9` }}
              />
            )}
          </div>
        </Flex>
        <Flex align={"center"}>
          <Text fw={500}>{payment}</Text>
          <IconPointFilled style={{ color: `#7B7C88`, height: 15 }} />
          <Text>{item.type_of_work.title}</Text>
        </Flex>
        <Flex columnGap={10}>
          <IconMapPin style={{ color: `#ACADB9` }} />
          <Text>{item.town.title}</Text>
        </Flex>
      </Paper>
    </>
  );
};

export default JobItem;
