import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 
 

const Chart = ({price}) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            
            text: 'Chart.js Line Chart',
          },
        },
      };
      const labels = [];
      const prices=[];
      price.map((e)=>
      
        labels.push(new Date( e[0]).toLocaleDateString())
        
      )
      price.map((e)=>
      
        prices.push(e[1])
        
      )
    const data = {
        labels,
        datasets: [
          {
            label: 'Bitcoin Prices',
            data:prices,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        
        ],
      };
  return (
    <Box  className='flex justify-center ' width={["100%","90%"]} height={"300px"} >
    <Line 
   options={options}
   data={data}
   
  /></Box>
  )
}

export default Chart