import { useState } from "react";

// Example list of airports (you can replace this with a larger dataset or fetch from an API)
const airports = [
  { city: "Delhi", code: "DEL" },
  { city: "Mumbai", code: "BOM" },
  { city: "Bengaluru", code: "BLR" },
  { city: "Kolkata", code: "CCU" },
  // Add more airports as needed
];

const FLightComponent = () => {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);

  const handleFromInputChange = (event) => {
    const value = event.target.value;
    setFromInput(value);
    setFilteredFromAirports(
      airports.filter((airport) =>
        airport.city.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleToInputChange = (event) => {
    const value = event.target.value;
    setToInput(value);
    setFilteredToAirports(
      airports.filter((airport) =>
        airport.city.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div
      style={{
        padding: "30px 30px",
        backgroundColor: "#f8f8f8",
        borderBottom: "1px solid #ddd",
      }}
      className="container"
    >
      <div style={{ marginBottom: "20px" }} className="text-center">
        <h2 style={{ color: "#ff6347", margin: 0 }}>Awesome Tours</h2>
        <h3 style={{ margin: "5px 0" }}>Best Holiday Package</h3>
        <p style={{ color: "#555", fontSize: "14px" }}>
          Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo,
          lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam
          sit.
        </p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <form className="row g-3">
          <div className="col-md-3">
            <label
              style={{ fontSize: "12px", marginBottom: "5px", color: "#555" }}
            >
              From
            </label>
            <input
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
            <select
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
              <option value="" disabled selected>
                Select Origin
              </option>
              {filteredFromAirports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label
              style={{ fontSize: "12px", marginBottom: "5px", color: "#555" }}
            >
              To
            </label>
            <input
              type="text"
              value={toInput}
              onChange={handleToInputChange}
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
            <select
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
              <option value="" disabled selected>
                Select Destination
              </option>
              {filteredToAirports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label
              style={{ fontSize: "12px", marginBottom: "5px", color: "#555" }}
            >
              Departure
            </label>
            <input
              type="date"
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
              Return
            </label>
            <input
              type="date"
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
          <div className="col-md-12 d-flex justify-content-end">
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
  );
};

export default FLightComponent;
