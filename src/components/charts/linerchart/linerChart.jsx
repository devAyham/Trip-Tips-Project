import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'


let LineChart=({chartData})=>{
    return <Line data={chartData} 
    options={{
        aspectRatio :3.6,
        plugins:{
            legend :{
                labels :{
                    color :'white',
                    boxWidth: 20,
                    font:{
                        // size: 12,
                        // family: ''
                    },
                    
                }
            },
            scales: {
                y: {
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
        }
    
    }}/>;
}
export default LineChart ;