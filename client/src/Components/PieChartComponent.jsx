import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PieChartComponent = () => {
  const [tickets, setTickets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [count, setCount] = useState([]);

  const findCity = async (city) => {
    const res = await axios.get(`http://localhost:3000/api/city/${city}`);
    return res.data.name;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:3000/api/ticket/count/trip")
          .then((res) => {
            console.log(res.data);
            setTickets(res.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(tickets);
    tickets.map((item) => {
      if (
        labels.indexOf(item._id.departureCity + "-" + item._id.arrivalCity) ===
        -1
      ) {
        labels.push(item._id.departureCity + "-" + item._id.arrivalCity);
        count.push(item.count);
      }
    });
    console.log(tickets[0]);
  }, [tickets]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: count,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 2,
      },
    ],
    Options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
        },
      },
    },
  };
  return (
    <div className=" max-w-sm max-h-sm">
      <Pie data={data} />
    </div>
  );
};

export default PieChartComponent;