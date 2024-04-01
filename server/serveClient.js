const e = require("express");
const express = require("express");
const fs = require("fs");
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

  if (fs.existsSync(buildDirectory)) {
    app.use(express.static(buildDirectory));

    app.get("*", (req, res) => {
      res.sendFile(`${buildDirectory}/index.html`);
    });
  } else {
    console.error(
      `❌ Server ERROR: 
  - The client build path (${buildDirectory}) does not exist. 
  - The application will not be able to serve static assets
  - Please make sure to build the client with \`$ vite build\``
    );
  }
};
