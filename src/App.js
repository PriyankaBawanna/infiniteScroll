import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch countries on initial render
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    // Fetch states for the selected country
    fetch(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    // Fetch cities for the selected state
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Location Selector</h1>

      {/* Country Dropdown */}
      <label className="block mb-2">Select Country:</label>
      <select
        className="block w-full mb-4 p-2 border rounded"
        value={selectedCountry}
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">-- Select Country --</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <label className="block mb-2">Select State:</label>
      <select
        className="block w-full mb-4 p-2 border rounded"
        value={selectedState}
        onChange={(e) => handleStateChange(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">-- Select State --</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <label className="block mb-2">Select City:</label>
      <select
        className="block w-full mb-4 p-2 border rounded"
        value={selectedCity}
        onChange={(e) => handleCityChange(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">-- Select City --</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display Selected Location */}
      {selectedCountry && selectedState && selectedCity && (
        <p className="mt-4 text-green-600 font-medium">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};

const DisplayName = () => {
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showName, setShowName] = useState(false);

  const handleSubmit = () => {
    if (fistName && lastName) {
      setShowName(true);
    }
  };
  return (
    <>
      <div>
        <label>First Name</label>
        <input
          type="text"
          placeholder=""
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          placeholder=""
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>submit</button>

      {showName && (
        <>
          Full Name {fistName}
          {lastName}
        </>
      )}
    </>
  );
};

function App() {
  return (
    <>
      <DisplayName />
    </>
  );
}

export default App;
