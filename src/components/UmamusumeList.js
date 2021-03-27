import React from "react";
import { useQuery } from "@apollo/client";
import { fetchUmamusumes } from "../queries/umamusume";

export const UmamusumeList = (props) => {
  const { loading, error, data } = useQuery(fetchUmamusumes, []);
  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.umamusumeList.map(({ name }) => (
        <p key={name.ko}>{name.ko}</p>
      ))}
    </div>
  );
};

export default UmamusumeList;
