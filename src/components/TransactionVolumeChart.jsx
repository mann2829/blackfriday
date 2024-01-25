import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import { useEffect } from "react";
import FilterButton from "./FilterButton";
import SeriesButton from "./SeriesButton";

const TransactionVolumeChart = ({ type, transactionVolume }) => {
  useEffect(() => {
    setCurrentValue(
      transactionVolume?.currentValue?.slice(0, currentSelectedHour + 1)
    );
    setPreviousValue(
      transactionVolume?.previousValue?.slice(0, currentSelectedHour + 1)
    );
  }, [transactionVolume]);

  const [currentValue, setCurrentValue] = useState(
    transactionVolume?.currentValue
  );
  const [previousValue, setPreviousValue] = useState(
    transactionVolume?.previousValue
  );
  const [currentSelectedHour, setCurrentSelectedHour] = useState(24);
  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: type,
    },
    title: {
      text: "",
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    accessibility: {
      enabled: false,
    },
    series: [
      {
        name: transactionVolume.previousLabel,
        showInLegend: false,
        color: "#58e9c4",
        data: previousValue,
        shadow: {
          color: "#58e9c4",
          width: 10,
          opacity: 1,
          offsetX: 0,
          offsetY: 0,
        },
      },
      {
        name: transactionVolume.currentLabel,
        showInLegend: false,
        color: "#0288d1",
        data: currentValue,
        shadow: {
          color: "#0288d1",
          width: 10,
          opacity: 1,
          offsetX: 0,
          offsetY: 0,
        },
      },
    ],
    xAxis: {
      categories: transactionVolume.label,
    },
    yAxis: {
      title: "",
      gridLineDashStyle: "dash",
    },
  };

  const handleFilter = (limit) => {
    setCurrentValue(transactionVolume.currentValue.slice(0, limit + 1));
    setPreviousValue(transactionVolume.previousValue.slice(0, limit + 1));
  };

  return (
    <section className="total-transaction-volume-sec">
      <div className="custom-container">
        <span className="growth volume">
          {transactionVolume.totalGrowth}% Growth
        </span>
        <div className="chart-title volume">Total Transaction Volume</div>
        <HighchartsReact highcharts={Highcharts} options={options} immutable />
        {transactionVolume.currentValue && (
          <FilterButton handleFilter={handleFilter} />
        )}
        <div className="map-btn">
          {transactionVolume.totals && (
            <SeriesButton series={transactionVolume.totals}/>
          )}
        </div>
      </div>
    </section>
  );
};
export default TransactionVolumeChart;
