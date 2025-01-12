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

const NameForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e;
    if (firstName.trim() && lastName.trim()) {
      setFullName(`${firstName.trim()} ${lastName.trim()}`);
    } else {
      setFullName(null);
    }
  };

  return (
    <div>
      {/* Initial Page Render */}
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Display Full Name */}
      <div>
        {fullName ? (
          <p>Your full name is: {fullName}</p>
        ) : (
          <p>Please fill out both fields to display your full name.</p>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <NameForm />
    </>
  );
}

export default App;
