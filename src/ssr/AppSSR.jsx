import React from "react";
import { StaticRouter } from "react-router-dom/server";
import App from "../App";

export default function AppSSR({ url, initialData }) {
  return (
    <StaticRouter location={url}>
      <App initialData={initialData} />
    </StaticRouter>
  );
}
