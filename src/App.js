import React, { useState, useEffect } from "react";

const NameForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
