import React, { useState } from "react";

const FilterButton = ({ handleFilter }) => {
  const [hoursFilter, setHoursFilter] = useState([
    {
      hour: 6,
      active: false,
    },
    {
      hour: 12,
      active: false,
    },
    {
      hour: 18,
      active: false,
    },
    {
      hour: 24,
      active: true,
    },
  ]);

  const handleActive = (hours) => {
    let updatedHours = hoursFilter.map((hoursFilter) => {
      hoursFilter.active = false;
      if (hours === hoursFilter.hour) {
        hoursFilter.active = true;
      }
      return hoursFilter;
    });
    setHoursFilter(updatedHours);
    handleFilter(hours);
  };

  return (
    <div className="total-hour-sec">
      <ul className="total-hour-btn">
        {hoursFilter.map((hoursFilter, index) => {
          return (
            <li
              className={hoursFilter.active ? "active" : ""}
              onClick={() => {
                handleActive(hoursFilter.hour);
              }}
              key={`tv${index}`}
            >
              {hoursFilter.hour}h
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default FilterButton;
