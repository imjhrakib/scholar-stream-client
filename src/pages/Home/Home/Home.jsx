import React from "react";
import Banner from "../Banner/Banner";
import TopScholarship from "./TopScholarship";
import FeaturedUniversities from "./FeaturedUniversities";
import SuccessStories from "./SuccessStories";
import HowItWorks from "./HowItWorks";
import ScholarshipCategories from "./ScholarshipCategories";
import UpcomingDeadlines from "./UpcomingDeadlines";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import BlogSection from "./BlogSection";
import Newsletter from "./Newsletter";
import MyProfile from "../../DashboardHome/MyProfile";

const Home = () => {
  return (
    <div className="pt-1 space-y-16">
      {/* Hero Banner */}
      <Banner />

      {/* Top Scholarships */}
      <TopScholarship />

      {/* Featured Universities */}
      <FeaturedUniversities />

      {/* How it Works */}
      <HowItWorks />

      {/* Scholarship Categories */}
      <ScholarshipCategories />

      {/* Upcoming Deadlines */}
      <UpcomingDeadlines />

      {/* Student Success Stories */}
      <SuccessStories />

      {/* Testimonials */}
      <Testimonials />

      {/* Blog & Tips Section */}
      <BlogSection />

      {/* FAQs */}
      <FAQ />

      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default Home;
