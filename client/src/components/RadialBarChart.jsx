// components/RadialBarChart.js
import React from "react";
import Chart from "react-apexcharts";

const RadialBarChart = ({ percentage, color }) => {
  const options = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "65%" },
        dataLabels: {
          name: { show: false },
          value: {
            formatter: (val) => `${val}%`,
            fontSize: "16px",
            fontWeight: 600,
            color: color,
          },
        },
        track: {
          background: "#e5e7eb",
        },
      },
    },
    fill: { colors: [color] },
    stroke: { lineCap: "round" },
  };

  return (
    <Chart
      options={options}
      series={[percentage]}
      type="radialBar"
      height={90}
      width={90}
    />
  );
};

export default RadialBarChart;
