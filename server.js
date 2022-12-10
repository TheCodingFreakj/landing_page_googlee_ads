import express, { json, urlencoded } from "express";
import cors from "cors";
import path from "path";
import mailchimp from "@mailchimp/mailchimp_marketing";
import client from "@mailchimp/mailchimp_marketing";
import connection from "./db.js";
import * as dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.SERVER_PREFIX,
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();

app.post("/add-contact", async (req, res) => {
  console.log("hvhvh");
  const response = await client.lists.addListMember(
    "3f953a4f9e",
    {
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.body.name,
        MMERGE8: req.body.message,
        PHONE: req.body.phone,
        MMERGE9: new Date(),
      },
    },
    {
      skipMergeValidation: true,
    }
  );

  console.log(response);
  res.status(200).send({
    message: "Thank You For Registering a discovery call with me",
  });
});

app.post("/serviceDetails", async (req, res) => {
  var serviceAdded = `INSERT INTO services (email, serviceData) VALUES(?,?)`;

  connection.query(
    serviceAdded,
    [req.body.email, JSON.stringify(req.body.arraySecodary)],
    (err) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({
          message: "There is some unexpected error",
        });
        return;
      }

      res.status(200).send({
        message: "Thanks for showing interest. We will get back to you soon",
      });
    }
  );
});

app.use(express.static(path.resolve(__dirname, "public")));
app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "public/index.html"));
});
// set port, listen for requests
const PORT = process.env.PORT || 9099;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
