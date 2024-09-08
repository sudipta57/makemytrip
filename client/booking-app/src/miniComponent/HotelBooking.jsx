import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setHotelData } from "../redux/reducers/booking";
import toast from "react-hot-toast";
const UnderNavbarComponent = () => {
  const dispatch = useDispatch();
  const [fromInput, setFromInput] = useState("");
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [placeId, setPlaceId] = useState("177865");
  const [formValues, setFormValues] = useState({
    adultsNumber: "1",
    checkinDate: "",
    checkoutDate: "",
    childrenAges: "0",
    priceMin: "",
    priceMax: "",
  });

  useEffect(() => {
    if (filteredFromAirports.length <= 0) {
      console.log("Fetching Delhi data");

      axios
        .post(
          "http://localhost:3000/api/hotellocation",
          { location: "delhi" },
          { withCredentials: true } // Ensure cookies are sent with the request
        )
        .then((response) => {
          setFilteredFromAirports(
            response.data.map((item) => ({
              city: item.name,
              code: item.gaiaId,
            }))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleFromInputChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setFilteredFromAirports([]);
      setFromInput("");
      return toast.error("Please enter a city");
    }
    setFromInput(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      const token = localStorage.getItem("authtoken");
      axios
        .post("http://localhost:3000/api/hotellocation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          location: value,
        })
        .then((response) => {
          console.log(response.data);
          setPlaceId(response.data.data[0].gaiaId);
          setFilteredFromAirports(
            response.data.map((item) => ({
              city: item.name,
              code: item.gaiaId,
            }))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);

    setTimeoutId(newTimeoutId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const selectedCode = event.target.value;
    console.log(selectedCode);
    setPlaceId(selectedCode);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const toastId = toast.loading("Searching for hotels");
    event.preventDefault();
    const data = {
      location: placeId,
      adults_number: formValues.adultsNumber,
      checkin_date: formValues.checkinDate,
      checkout_date: formValues.checkoutDate,
      children_ages: formValues.childrenAges,
      price_min: formValues.priceMin,
      price_max: formValues.priceMax,
    };
    axios
      .post("http://localhost:3000/api/hotelsearch", data, {
        withCredentials: true,
      })
      .then((response) => {
        // if (response.data.response.status !== 200) {
        //   console.log(response.data.response.error);
        //   return toast.error("Error searching hotels", { id: toastId }); // Display a generic error message
        // }
        console.log(response);
        dispatch(setHotelData(response.data));
        navigate("/hotelcomponent");
        toast.success("Hotels found", { id: toastId }); // Moved success toast here
      })
      .catch((error) => {
        toast.error("Error searching hotels", { id: toastId }); // Display a generic error message
        console.error("Error searching hotels:", error);
      });
  };

  return (
    <>
      <div
        style={{
          padding: "30px 30px",
          backgroundColor: "#f8f8f8",
          borderBottom: "1px solid #ddd",
        }}
        className="container"
      >
        <div style={{ marginBottom: "20px" }} className="text-center">
          <h2 style={{ color: "#ff6347", margin: 0 }}>
            Awesome hotels in Delhi
          </h2>
          <p style={{ color: "#555", fontSize: "14px" }}>
            Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo,
            lacinia eget consectetur sed, convallis at tellus. Vestibulum ac
            diam sit.
          </p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <label
                style={{ fontSize: "12px", marginBottom: "5px", color: "#555" }}
              >
                City, Property Name Or Location Of{" "}
                <span style={{ color: "#ff7039", fontSize: "16px" }}>
                  Delhi
                </span>
              </label>
              <input
                disabled
                required
                type="text"
                value={fromInput}
                onChange={handleFromInputChange}
                placeholder="Enter city"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  width: "100%",
                }}
                className="form-control"
              />
              <div className="my-3">
                <label
                  style={{
                    fontSize: "12px",
                    marginBottom: "5px",
                    color: "#555",
                  }}
                >
                  Select location
                </label>
                <select
                  onChange={handleSelectChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    width: "100%",
                    marginTop: "10px",
                  }}
                  className="form-select"
                >
                  <option value="" disabled>
                    Select Origin
                  </option>
                  {filteredFromAirports.map((airport, i) => (
                    <option key={i} value={airport.code}>
                      {airport.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    marginBottom: "5px",
                    color: "#555",
                  }}
                >
                  Check In
                </label>
                <input
                  required
                  type="date"
                  name="checkinDate"
                  value={formValues.checkinDate}
                  onChange={handleInputChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    width: "100%",
                  }}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <label
                style={{ fontSize: "12px", marginBottom: "5px", color: "#555" }}
              >
                Check Out
              </label>
              <input
                required
                type="date"
                name="checkoutDate"
                value={formValues.checkoutDate}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  width: "100%",
                }}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label
                style={{ fontSize: "12px", marginBottom: "5px", color: "#555" }}
              >
                Room & Adults
              </label>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  width: "100%",
                  // marginTop: "10px",
                }}
              >
                <div>
                  <label style={{ fontSize: "12px", marginBottom: "5px" }}>
                    Childrens
                  </label>
                  <select
                    name="childrenAges"
                    value={formValues.childrenAges}
                    className="form-select"
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                  >
                    {[0, 1, 2, 3, 4].map((adult) => (
                      <option key={adult} value={adult}>
                        {adult} Child{adult > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", marginBottom: "5px" }}>
                    Adults
                  </label>
                  <select
                    name="adultsNumber"
                    value={formValues.adultsNumber}
                    className="form-select"
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4].map((adult) => (
                      <option key={adult} value={adult}>
                        {adult} Adult{adult > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-between">
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#ff6347",
                  color: "white",
                  cursor: "pointer",
                }}
                className="btn"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UnderNavbarComponent;
