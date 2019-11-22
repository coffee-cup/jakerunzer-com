import * as React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
import Link from "../components/Link";

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not Found" />
    <Centered>
      <div>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    </Centered>
  </Layout>
);

export default NotFoundPage;
