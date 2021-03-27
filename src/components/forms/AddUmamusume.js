import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { fetchSongList } from "../queries/fetchSongs";

const AddUmamusume = (props) => {
  const { loading, error, data } = useQuery(fetchSongList, []);
  console.log(loading, error, data );
  return <div></div>;
};

export default AddUmamusume;
