import React from "react";
import { Chart, Doughnut, Pie, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, default as defaults } from "chart.js/auto";

// Chart.overrides[Pie].plugins.legend.position = 'bottom'
// plugins.legend.position ='bottom'
// defaults.defaults.plugins.legend.position ='ri'
// defaults.overrides.polarArea.backgroundColor ='red'
// defaults.overrides.polarArea.borderColor ='red'
// defaults.overrides.polarArea.color ='red'
// defaults.overrides.polarArea.devicePixelRatio.toFixed ='true'
// defaults.overrides.polarArea ='red'
// defaults.overrides.polarArea.bar.datasets.hidden = true

let PieChart = ({ chartData, options }) => {
  return (
    <>
      {" "}
      <PolarArea
        data={chartData}
        height={40}
        options={{
          aspectRatio: 2,
          plugins: {
            legend: {
              position: "right",
              display: true,
              align: "center",
              fullSize: true,
              labels: {
                color: "white",
                boxWidth: 20,
                font: {
                  size: 20,
                  // family: ''
                },
              },
            },
          },
          // legend: {
          //     display: false
          //     //   },
          scales: {
            r: {
              ticks: {
                color: "white",
                backdropColor: "transparent",
              },
              grid: {
                color: "gray",
              },
              angleLines: {
                display: "false",
                color: "gray",
              },
            },
          },
        }}
      />{" "}
    </>
  );
};
export default PieChart;
