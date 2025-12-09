import React from "react";
import Banner from "../Banner/Banner";

import TopScholarship from "./TopScholarship";
import SuccessStories from "./SuccessStories";
import FAQ from "./FAQ";
import Forbidden from "../../../components/ui/Forbidden";
import Loading from "../../../components/ui/Loading";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopScholarship></TopScholarship>
      <SuccessStories></SuccessStories>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
