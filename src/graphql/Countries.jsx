import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries";
import "./Countries.css";

function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="container">
      <h2>Countries with Capitals (GraphQL Example)</h2>
      <div className="countries">
        {data.countries.map((country) => (
          <div key={country.code} className="country-card">
            <h3>
              {country.name} {country.emoji}
            </h3>
            <p>Capital: {country.capital}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;