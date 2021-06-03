import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../App";
import Countries from "./Countries";
import axios from "axios";
export const DataContext = React.createContext();
const Home = () => {
  //initial url to fetch data
  let url = "https://restcountries.eu/rest/v2/all";

  //function to fetch data when searching for a specific country
  const searchAPI = (e) => {
    url = `https://restcountries.eu/rest/v2/name/${e.target.value}`;
    fetchData(url);
  };

  //function to fetch filtered data based on region
  const setNewAPI = (e) => {
    url = `https://restcountries.eu/rest/v2/region/${e.target.innerText.toLowerCase()}`;
    fetchData(url);
  };

  //The main function to fetch data
  const fetchData = async (currentUrl) => {
    console.log(currentUrl);
    const { data } = await axios.get(currentUrl);
    setCountries(data);
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  //countries data state
  const [countries, setCountries] = useState([]);

  //using context API for theme change to use
  const isDarkMode = useContext(ThemeContext);

  //filter select option state for styling purposes
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  return (
    <DataContext.Provider value={countries}>
      <section id="home">
        <div className="container">
          <div className="top-header">
            <div className={`search ${isDarkMode ? "dark-mode-element dark-mode-input" : "light-mode-input"}`}>
              <i className="fas fa-search"></i>
              <input
                onKeyUp={searchAPI}
                className={`${isDarkMode ? "dark-mode-element dark-mode-input" : "light-mode-input"}`}
                placeholder="Search for a country..."
                type="search"
              />
            </div>
            <div id="filter">
              <div
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className={`select ${isDarkMode ? "dark-mode-element dark-mode-text" : "light-mode-element light-mode-text"}`}
              >
                Filter by Country <i style={isRegionOpen ? { transform: "rotate(180deg)" } : { transform: "unset" }} className="fas fa-arrow-up"></i>
              </div>
              <div
                className={`regions ${isDarkMode ? "dark-mode-element dark-mode-text" : "light-mode-element light-mode-text"} ${
                  isRegionOpen ? "region-open" : "region-closed"
                }`}
              >
                <div
                  onClick={setNewAPI}
                  className="region"
                  style={isRegionOpen ? { display: "block" } : { display: "none" }}
                  className={`region-links`}
                >
                  Africa
                </div>
                <div
                  onClick={setNewAPI}
                  className="region"
                  style={isRegionOpen ? { display: "block" } : { display: "none" }}
                  className={`region-links`}
                >
                  Americas
                </div>
                <div
                  onClick={setNewAPI}
                  className="region"
                  style={isRegionOpen ? { display: "block" } : { display: "none" }}
                  className={`region-links`}
                >
                  Asia
                </div>
                <div
                  onClick={setNewAPI}
                  className="region"
                  style={isRegionOpen ? { display: "block" } : { display: "none" }}
                  className={`region-links`}
                >
                  Europe
                </div>
                <div
                  onClick={setNewAPI}
                  className="region"
                  style={isRegionOpen ? { display: "block" } : { display: "none" }}
                  className={`region-links`}
                >
                  Oceania
                </div>
              </div>
            </div>
          </div>
          <Countries data={countries}></Countries> {/* Passing fetched data to the Countries component*/}
        </div>
      </section>
    </DataContext.Provider>
  );
};

export default Home;
