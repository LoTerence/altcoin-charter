import React, { useEffect } from "react";
import Layout from "../universal/Layout";

export default () => {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const params = window.location.search;
    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage(params);
      // close the popup
      window.close();
    }
  });

  // some text to show the user
  return (
    <Layout>
      <p>Please wait...</p>
    </Layout>
  );
};
