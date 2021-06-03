import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./Components/Detail/Details";
import Home from "./Components/Home/Home";
import BorderDetail from "./Components/Detail/BorderDetail";

//Making a theme context to be able to switch themes in my entire app
export const ThemeContext = React.createContext();

const App = () => {
  //them state
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode-bg");
      document.body.classList.remove("light-mode-bg");
    } else {
      document.body.classList.remove("dark-mode-bg");
      document.body.classList.add("light-mode-bg");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <ThemeContext.Provider value={isDarkMode}>
        <nav id="navbar">
          <div className={`navbar container ${isDarkMode ? "dark-mode-text dark-mode-element" : "light-mode-text light-mode-element"}`}>
            <p className="logo">Where in the world?</p>
            <button
              type="button"
              className={`change-theme ${isDarkMode ? "dark-mode-text dark-mode-element" : "light-mode-text light-mode-element"}`}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <i className="fas fa-moon"></i>
              Dark Mode
            </button>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/details/:code" children={<Details />}></Route>
          <Route path="/border/:code" children={<BorderDetail />}></Route>
        </Switch>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
