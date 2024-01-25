import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TransactionPerHourChart = ({ type, transactionPerHour }) => {
  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: type,
    },
    title: {
      text: "",
      align: "left",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        color: "#4b85b3", // Set the default background color for columns
      },
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
    series: [
      {
        name: "",
        showInLegend: false,
        data: transactionPerHour.value || [0],
      },
    ],
    xAxis: {
      categories: transactionPerHour.label,
    },
    yAxis: {
      title: "",
      gridLineDashStyle: "dash",
    },
  };

  return (
    // <section className="total-transaction-value-sec">
    <div className="custom-container">
      <div className="chart-heading">Transaction per hour</div>
      <HighchartsReact highcharts={Highcharts} options={options} immutable />
    </div>
    // </section>
  );
};
export default TransactionPerHourChart;
