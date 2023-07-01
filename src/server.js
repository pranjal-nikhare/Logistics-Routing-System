const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const path = require("path");
const { getBasicData, addRequest, getBasicDataById } = require("./database.js");

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/Delivery_Data", async (req, res) => {
  try {
    const data = await getBasicData();
    res.send(data);
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.post("/", async (req, res) => {
  try {
    const origin = req.body.OriginAddress;
    const destination = req.body.DeliveryAddress;
    const name = req.body.Date;

    console.log(
      name + " is requesting a delivery from " + origin + " to " + destination
    );
    console.log(req.body);

    const result = await addRequest(name, origin, destination);
    console.log("Data inserted into the database:", result);

    res.send("Logged in and data inserted into the database!");
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
