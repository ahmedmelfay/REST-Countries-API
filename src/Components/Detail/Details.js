//This file loops to BorderDetail.js

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../App";
import axios from "axios";
const Details = () => {
  const isDarkMode = useContext(ThemeContext);

  //using link param to fetch the clicked country
  const { code } = useParams();
  const [countries, setCountries] = useState([]);

  //fetching data
  const fetchData = () => {
    axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`).then((resp) => {
      setCountries([resp.data]);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="details">
      {console.log(countries)}
      <div className="container">
        <div className="back-btn">
          <Link className={`back-btn-inner ${isDarkMode ? "dark-mode-element dark-mode-text" : "light-mode-element light-mode-text"}`} to="/">
            <i className="fas fa-long-arrow-alt-left"></i>
            Back
          </Link>
        </div>
        {countries.map((country, index) => {
          return (
            <div key={index} className="country-container">
              <div className="country-img">
                <img src={country.flag} alt="" />
              </div>
              <div className={`country-details ${isDarkMode ? "dark-mode-text" : "light-mode-text"}`}>
                <h2>{country.name}</h2>
                <div className="detail-section-1">
                  <p>
                    Native Name: <span>{country.nativeName}</span>
                  </p>
                  <p>
                    Population: <span>{country.population}</span>
                  </p>
                  <p>
                    Region: <span>{country.region}</span>
                  </p>
                  <p>
                    Sub Region: <span>{country.subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{country.capital}</span>
                  </p>
                </div>
                <div className="detail-section-2">
                  <p>
                    Top Level Domain: <span>{country.topLevelDomain}</span>
                  </p>
                  <p>
                    Currencies:{" "}
                    {country.currencies.map((currency, index) => {
                      return <span key={index}>{currency.name} </span>;
                    })}
                  </p>
                  <p>
                    Languages:{" "}
                    {country.languages.map((lang, i) => (
                      <span key={i}>{lang.name} </span>
                    ))}
                  </p>
                </div>
                <div className="detail-section-3">
                  <h2>Border Countries:</h2>
                  <div className="borders">
                    {country.borders.map((border, i) => {
                      return (
                        <div key={i} className="border-country">
                          <Link
                            to={`/border/${border}`}
                            className={`border-country-inner ${
                              isDarkMode ? "dark-mode-element dark-mode-text" : "light-mode-element light-mode-text"
                            }`}
                          >
                            {border}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Details;
