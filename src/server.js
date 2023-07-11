const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const path = require("path");
const https = require("https");
const database = require("./database.js");

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/", async (req, res) => {
  const origin = req.body.OriginAddress;
  const destination = req.body.DeliveryAddress;
  const name = req.body.UserName;

  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    origin +
    ".json?proximity=ip&access_token=xxxxxxxxxxxxxxxxxxxxxxx";

  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    destination +
    ".json?proximity=ip&access_token=xxxxxxxxxxxxxxxxxxxxxxx";

  https.get(url, function (response) {
    console.log(response.statusCode);

    let data = "";

    response.on("data", function (chunk) {
      data += chunk;
    });

    response.on("end", function () {
      const jsonData = JSON.parse(data);
      const coordinates = jsonData.features[0].geometry.coordinates;
      console.log(coordinates);

      https.get(url2, function (response2) {
        console.log(response2.statusCode);

        let data2 = "";

        response2.on("data", function (chunk2) {
          data2 += chunk2;
        });

        response2.on("end", async function () {
          const jsonData2 = JSON.parse(data2);
          const coordinates2 = jsonData2.features[0].geometry.coordinates;
          console.log(coordinates2);

          console.log(
            name +
              " is requesting a delivery from " +
              origin +
              " to " +
              destination
          );
          console.log(req.body);

          await database.insertData(
            name,
            origin,
            coordinates,
            destination,
            coordinates2
          );
          console.log("Data inserted into database");
          res.send("Your request has been submitted");
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
