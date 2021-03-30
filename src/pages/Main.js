import React from "react";
import SearchForm from "components/SearchForm";
import { Link } from "react-router-dom";
import UmamusumeList from "components/Umamusume/UmamusumeList";

const Main = () => {
  return (
    <div>
      <Link to="/admin">관리자 페이지</Link>
      <SearchForm />
      <UmamusumeList />
    </div>
  );
};

export default Main;
