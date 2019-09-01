import * as React from "react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <Layout>
      <SEO />
      <div className="home">
        <Logo />
        <h1>Hello World</h1>
      </div>
    </Layout>
  );
};

export default Home;
