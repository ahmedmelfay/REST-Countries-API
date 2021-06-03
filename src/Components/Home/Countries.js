import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
const Countries = ({ data }) => {
  const isDarkMode = useContext(ThemeContext);

  return (
    <section id="countries">
      <div className="items">
        {data.map(({ flag, name, population, region, capital, alpha3Code }, index) => {
          return (
            <div key={index} className={`item`}>
              <Link to={`/details/${alpha3Code}`}>
                <div className={`item-inner ${isDarkMode ? "dark-mode-element dark-mode-text" : "light-mode-element light-mode-text"}`}>
                  <div className="item-image">
                    <img src={flag} alt="" />
                  </div>
                  <div className={`item-content`}>
                    <h2>{name}</h2>
                    <div className="item-details">
                      <p className="item-detail">
                        Population: <span>{population}</span>
                      </p>
                      <p className="item-detail">
                        Region: <span>{region}</span>
                      </p>
                      <p className="item-detail">
                        Capital: <span>{capital}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Countries;
