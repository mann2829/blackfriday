import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import FilterButton from "./FilterButton";
import SeriesButton from "./SeriesButton";

const TransactionValueChart = ({ type, valueTrans }) => {
  useEffect(() => {
    setCurrentValue(
      valueTrans?.currentValue?.slice(0, currentSelectedHour + 1)
    );
    setPreviousValue(
      valueTrans?.previousValue?.slice(0, currentSelectedHour + 1)
    );
  }, [valueTrans]);

  const [currentValue, setCurrentValue] = useState(valueTrans?.currentValue);
  const [previousValue, setPreviousValue] = useState(valueTrans?.previousValue);
  const [currentSelectedHour, setCurrentSelectedHour] = useState(24);

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: type,
      backgroundColor: "#004b72",
    },
    title: {
      text: "",
      style: {
        color: "#ffffff", // Set x-axis labels font color
      },
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
        name: valueTrans.previousLabel,
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
        name: valueTrans.currentLabel,
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
      categories: valueTrans.label,
      labels: {
        style: {
          color: "#ffffff", // Set x-axis labels font color
        },
      },
    },
    yAxis: {
      title: "",
      gridLineDashStyle: "dash",
      gridLineColor: "#7ca1b5",
      labels: {
        style: {
          color: "#ffffff", // Set x-axis labels font color
        },
      },
    },
  };

  const handleFilter = (hours) => {
    setCurrentValue(valueTrans.currentValue.slice(0, hours + 1));
    setPreviousValue(valueTrans.previousValue.slice(0, hours + 1));
  };

  return (
    <section className="total-transaction-value-sec">
      <div className="custom-container">
        <span className="growth value">{valueTrans.totalGrowth}% Growth</span>
        <div className="chart-title">Total Transaction Value</div>
        <HighchartsReact highcharts={Highcharts} options={options} immutable />
        {valueTrans.currentValue && (
          <FilterButton handleFilter={handleFilter} />
        )}
        <div className="map-btn">
          {valueTrans.totals && <SeriesButton series={valueTrans.totals} prefix={"R"} />}
        </div>
      </div>
    </section>
  );
};
export default TransactionValueChart;
