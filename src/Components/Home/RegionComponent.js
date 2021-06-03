import React from "react";

const RegionComponent = ({ value }) => {
  return (
    <div onClick={setNewAPI} className="region" style={isRegionOpen ? { display: "block" } : { display: "none" }} className={`region-links`}>
      {value}
    </div>
  );
};

export default RegionComponent;
