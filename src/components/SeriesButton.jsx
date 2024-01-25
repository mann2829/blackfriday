import React from "react";
import { formatNumber } from "../common/util";

const SeriesButton = ({ series, prefix = "" }) => {
  return (
    series &&
    series.map((item, index) => {
      let className = `box${index + 1}`;
      return (
        <div className="wrapper" key={`series1${index}`}>
          <span className={className}></span>
          <span className="title">{item.label}:</span>
          <span className="title-desc">{prefix} {formatNumber(item.value)}</span>
        </div>
      );
    })
  );
};
export default SeriesButton;
