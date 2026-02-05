import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

function BarChartAnalysis(props) {
  return (
    <BarChart
      series={[
        { data: props.data.map(item => item.quantity) },
        
      ]}
      height={490}
      xAxis={[{ data: props.data.map(item => item.month), scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}

export default BarChartAnalysis;