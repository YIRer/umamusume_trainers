import React from "react";
import { useQuery } from "@apollo/client";
import { GET_UMAMUSUMES } from "../queries/umamusume";

export const UmamusumeList = (props) => {
  const { loading, error, data } = useQuery(GET_UMAMUSUMES, []);
  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.umamusumeList.map(({ name, id }) => (
        <p key={id}>{name.ko}</p>
      ))}
    </div>
  );
};

export default UmamusumeList;
