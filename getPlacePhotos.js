const axios = require("axios");

const getPlacePhotos = (placesArray) => {
  // google search place to get the place id

  const updatedPlaceArray = Promise.all(
    placesArray.map(async (place) => {
      let placeId = "";
      let photoRef = "";
      let position = {};

      let placeData = await axios.get(`
    https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=place_id&input=${place}&inputtype=textquery&key=${process.env.GOOGLE_PLACE_API_KEY}`);
      if (placeData?.data?.candidates?.length > 0) {
        placeId = placeData?.data?.candidates[0]?.place_id;

        let placeIdData = await axios.get(`
        https://maps.googleapis.com/maps/api/place/details/json?fields=photo%2Crating%2Cgeometry%2Cformatted_phone_number&place_id=${placeId}&key=${process.env.GOOGLE_PLACE_API_KEY}`);

        if (placeIdData.data.result.photos.length > 0) {
          photoRef = placeIdData?.data?.result?.photos[0]?.photo_reference;
          position = {
            lat: placeIdData?.data?.result.geometry.location.lat,
            lng: placeIdData?.data?.result.geometry.location.lng,
          };
        }
      }
      return {
        place,
        position,
        photoRef,
      };
    })
  );

  return updatedPlaceArray;
};

module.exports.getPlacePhotos = getPlacePhotos;
