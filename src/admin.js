const express = require("express");
const path = require("path");
const { getCoordinates } = require("./database.js");
const https = require("https");

function processCoordinates() {
  getCoordinates()
    .then((coordinates) => {
      // Extract the origin and destination coordinates from the 'coordinates' variable
      const origins = coordinates.map((coord) => coord.origin_wkt);
      const destinations = coordinates.map((coord) => coord.destination_wkt);

      // Format the coordinates as 'longitude,latitude' pairs
      const formattedOrigins = origins.map((point) => {
        const coordinates = point.match(/-?\d+\.\d+/g); // Extract latitude and longitude values
        return `${coordinates[0]},${coordinates[1]}`; // Format as 'longitude,latitude'
      });
      const formattedDestinations = destinations.map((point) => {
        const coordinates = point.match(/-?\d+\.\d+/g); // Extract latitude and longitude values
        return `${coordinates[0]},${coordinates[1]}`; // Format as 'longitude,latitude'
      });

      // Construct the API request URL
      const accessToken =
        "xxxxxxxxxxxxxxxxxxxx";
      const apiUrl = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${formattedOrigins.join(
        ";"
      )};${formattedDestinations.join(";")}?access_token=${accessToken}`;

      // console.log(apiUrl);

      // Send the API request
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          // Process the API response data

          const durations = data.durations;
          // console.log(durations);
          const durationsArray = [];
          for (let i = 0; i < durations.length; i++) {
            durationsArray.push(durations[i]);
          }
          console.log(durationsArray);
        })
        .catch((error) => {
          console.error("Error retrieving matrix data:", error);
        });
    })
    .catch((error) => {
      console.error("Error retrieving coordinates:", error);
    });
}

// Call the function to start the process
processCoordinates();
