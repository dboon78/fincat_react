import React, { useEffect } from "react";
import Hero from "../../Components/Hero/Hero";

interface Props {}

const HomePage = (props: Props) => {
  useEffect(() => {
    console.log(`BUILD: ${process.env.REACT_APP_BUILD}`);
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default HomePage;
