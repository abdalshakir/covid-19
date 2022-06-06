import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function LineChart() {

    const [dailyData, setDailyData] = useState({});
    
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await axios.get('https://covid19.mathdro.id/api/daily');
            const data = response.data;
            setDailyData(data)
        }
        console.log(dailyData)
        fetchAPI()
    }, [])


    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map((date) => date.reportDate),
                        datasets: [{
                            data: dailyData.map((confirmed) => confirmed.confirmed.total),
                            label: "Infected",
                            borderColor: "#3333ff",
                            fill: true
                        },{
                            data: dailyData.map((deaths) => deaths.deaths.total),
                            label: "Deaths",
                            borderColor: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.5)",
                            fill: true
                        }]
                    }}

                    options = {{
                        responsive: true,
                        plugins: {
                          legend: {
                            labels: {
                              usePointStyle: true,
                            },
                          }
                        }
                      }}
                />
            )
            : null
    )



    return (
        <div>
           {lineChart}
        </div>
    )
}

export default LineChart;