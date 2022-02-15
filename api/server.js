const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const firebaseAdmin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json("This is public info");
});

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://beautifulapp.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://beautifulapp.eu.auth0.com/api/v2/", // this is the same as in index.js
  issuer: "https://beautifulapp.eu.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/current-user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { sub: uid } = req.user;

  const options = {
    method: "GET",
    url: `https://beautifulapp.eu.auth0.com/api/v2/users/${uid}`,
    headers: { authorization: `Bearer ${token}` },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/all-users", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const options = {
    method: "GET",
    url: "https://beautifulapp.eu.auth0.com/api/v2/users",
    params: {
      q: "logins_count:[100 TO 200]",
      sort: "created_at:1",
      search_engine: "v3",
    },
    headers: { authorization: `Bearer ${token}` },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

const serviceAccount = require("./firebase/my-app-53709-firebase-adminsdk-u7jn7-5d8fb02bc0.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

app.get("/firebase", jwtCheck, async (req, res) => {
  const { sub: uid } = req.user;

  try {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(uid);
    res.json({ firebaseToken });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong acquiring a Firebase token.",
      error: err,
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server listened on port: ${process.env.PORT}`)
);
