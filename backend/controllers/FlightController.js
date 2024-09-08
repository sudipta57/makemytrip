import axios from "axios";
const FlightLocationController = async (req, res) => {
  const { location } = req.body;
  const options = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination",
    params: { query: location },
    headers: {
      "x-rapidapi-key": "88875402d8msh8eaff9501e4aa84p14713fjsn386a6a629245",
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default FlightLocationController;
