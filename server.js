import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/App.js";
import { StaticRouter } from "react-router-dom";
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const exams = require("./routes/api/exams");
const admin = require("./routes/api/admin");
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Mongodb is on");
  })
  .on("error", (error) => {
    console.log(error);
  });
const context = {};
const render = (url) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
};
var indexFile;
const readFile = () => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return true;
    }
    indexFile = data;
    return data;
  });
};
readFile();
app.get("/favicon.ico", async (req, res, next) => {
  fs.readFile(path.resolve("./build/favicon.ico"), (err, data) => {
    if (err) {
      console.log(err);
      return true;
    }
    if (!data) {
      res.status(500).send("Error In Server");
    } else {
      res.send(data);
    }
  });
});
app.get("/manifest.json", async (req, res, next) => {
  fs.readFile(path.resolve("./build/manifest.json"), (err, data) => {
    if (err) {
      console.log(err);
      return true;
    }
    if (!data) {
      res.status(500).send("Error In Server");
    } else {
      res.send(data);
    }
  });
});
app.get("/robots.txt", async (req, res, next) => {
  fs.readFile(path.resolve("./build/robots.txt"), (err, data) => {
    if (err) {
      console.log(err);
      return true;
    }
    if (!data) {
      res.status(500).send("Error In Server");
    } else {
      res.send(data);
    }
  });
});
app.get("/asset-manifest.json", async (req, res, next) => {
  fs.readFile(path.resolve("./build/asset-manifest.json"), (err, data) => {
    if (err) {
      console.log(err);
      return true;
    }
    if (!data) {
      res.status(500).send("Error In Server");
    } else {
      res.send(data);
    }
  });
});
app.get("/:route", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/details/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/show/:type", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/central_exams/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/search/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/state_exams/:state", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/state_exams/:state/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/engineering_exams/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/medical_exams/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/defence_exams/:exam", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.get("/user/:exams", async (req, res, next) => {
  const app = render(req.url);
  if (indexFile === true) {
    res.status(500).send("Error In Server");
  } else {
    res.send(
      indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  }
});
app.use(express.static(path.resolve(__dirname, "build")));
app.use("/api/exams", exams);
app.use("/api/users", users);
app.use("/admin", admin);
app.listen(port, () => console.log(`Started on http://localhost:${port}`));
