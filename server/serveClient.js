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

  const buildDirectory = path.resolve(__dirname, "..", "client/dist");

  app.use(express.static(buildDirectory));

  app.get("*", (req, res) => {
    res.sendFile(`${buildDirectory}/index.html`);
  });
};
