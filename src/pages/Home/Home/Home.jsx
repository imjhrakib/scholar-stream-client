import React from "react";
import Banner from "../Banner/Banner";

import TopScholarship from "./TopScholarship";
import SuccessStories from "./SuccessStories";
import FAQ from "./FAQ";
import MyProfile from "../../DashboardHome/MyProfile";

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
