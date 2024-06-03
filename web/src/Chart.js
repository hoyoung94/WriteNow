import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, LineChart } from '@mui/x-charts';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Typography } from '@mui/material';

// StyledTableCell as defined previously
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01579b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const getCurrentMonthYearLabels = () => {
  const labels = [];
  let currentYear = 2024; // Start from 2024년
  let currentMonth = 5; // Start from 5월

  for (let i = 0; i < 12; i++) {
    labels.push(`${currentYear}년 ${currentMonth}월`);

    // Update month and year
    if (currentMonth == 1) {
      currentMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
    }
  }

  return labels.reverse(); // Reverse to have chronological order
};

export default function TestChart({ query }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/trends/keywords/${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const transformedData = result.map((item, index) => ({
          score: Number(item.score),
        }));
        setData(transformedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (!query) {
    return <Typography variant="body1"></Typography>;
  }

  if (loading) {
    return <Typography variant="body1">로딩 중...</Typography>;
  }

  if (error) {
    return <Typography color="error">오류가 발생했습니다.: {error.message}</Typography>;
  }

  // Get x-axis labels
  const xLabels = getCurrentMonthYearLabels();

  // Reverse the data array if needed
  const reversedData = [...data].reverse();

  // Log the xLabels array to the console
  console.log("xLabels:", xLabels);

  // Prepare the dataset with correct x-axis data
  const dataset = xLabels.map((label, index) => ({
    month: label,
    score: reversedData[index] ? reversedData[index].score : null,
  }));

  return (
    <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
      <LineChart
        margin={{ left: 80 }}
        xAxis={[
          {
            dataKey: 'month',
            scaleType: 'band',
            categories: xLabels,
          },
        ]}
        series={[
          {
            dataKey: 'score',
            label: '관심도',
            curve: 'linear',
          },
        ]}
        dataset={dataset}
        height={300}
        legend={{ hidden: true }}
        grid={{ vertical: false, horizontal: true }}
      />
    </div>
  );
}
