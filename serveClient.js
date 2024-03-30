const express = require("express");
const path = require("path");

module.exports = (app) => {
  // Express only serves static assets in production
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Compress client static assets to gzip before serving
  const compress = require("compression");
  app.use(compress());

  const buildPath = path.join(__dirname, "client/dist");

  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(`${buildPath}/index.html`);
  });
};
