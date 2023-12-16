// import { getPlacePhotos } from "./getPlacePhotos.js";
const { getPlacePhotos } = require("./getPlacePhotos.js");

const handler = async (event) => {
  const places = JSON.parse(event.body).places;
  console.log("places", places);
  const data = await getPlacePhotos(places);
  console.log("data", data);

  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ message: data }),
  };
};

module.exports = { handler };
