const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");
const request = require("request");
const axios = require("axios").default;

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://beautifulapp.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://express-api-server",
  issuer: "https://beautifulapp.eu.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/secure", jwtCheck, (req, res) => {
  res.json("Secure Resource");
});

const getManagementApiJwt = () => {
  return new Promise(function (resolve, reject) {
    const options = {
      method: "POST",
      url: "https://beautifulapp.eu.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      body: '{"client_id":"3gFwcogFVz8RId8vFNMexZlNXHShwXmH","client_secret":"z2T6Zyisr79D-xkvbyIZEE9ZcCWWG6gotdaQVTHD2WEpQUO9QwXQ2t5ptpWOISt8","audience":"https://beautifulapp.eu.auth0.com/api/v2/","grant_type":"client_credentials"}',
    };
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

// ========================== get users info ==================

app.use("/users", async (req, res) => {
  const managementApiJwt = await getManagementApiJwt();
  const token = managementApiJwt.access_token;

  const options = {
    method: "GET",
    url: "https://beautifulapp.eu.auth0.com/api/v2/users",
    params: { search_engine: "v3" },
    headers: { authorization: `Bearer ${token}` },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(port, console.log(`Server listen on port: ${port}`));
