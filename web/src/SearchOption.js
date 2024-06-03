import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const genres = [
    'IT',
    '건강/취미',
    '과학',
    '수험서',
    '여행',
    '요리',
    '인문학',
    '자기계발',
    '참고서',
    '판타지',
];

const years = [
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024
]

const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
]
export default function BasicSelect() {
  const [genre, setGenre] = React.useState('');

  const [month, setMonth] = React.useState('');

  const [year, setYear] = React.useState('');

  const handleChange1 = (event) => {
    setGenre(event.target.value);
  };
  const handleChange2 = (event) => {
    setYear(event.target.value);
  };
  const handleChange3 = (event) => {
    setMonth(event.target.value);
  };


  return (
    <Box sx={{ minWidth: 120 }}>
        {/* 장르 선택 */}
      <FormControl sx={{ m: 1, minWidth: 120, backgroundColor:'white' }}>
        <InputLabel id="demo-simple-select-label">장르</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="genre"
          onChange={handleChange1}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
            >
              {genre}
            </MenuItem>
          ))}

        </Select>  
      </FormControl>

          {/* 연도 선택 */}
      <FormControl sx={{ m: 1, minWidth: 120, backgroundColor:'white' }}>
        <InputLabel id="demo-simple-select-label">연도 선택</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="year"
          onChange={handleChange2}
        >
          {years.map((year) => (
            <MenuItem
              key={year}
              value={year}
            >
              {year}
            </MenuItem>
          ))}

        </Select>
      </FormControl>

          {/* 월 선택 */}
      <FormControl  sx={{ m: 1, minWidth: 120, backgroundColor:'white' }}>
        <InputLabel id="demo-simple-select-label">월 선택</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="month"
          onChange={handleChange3}
        >
          {months.map((month) => (
            <MenuItem
              key={month}
              value={month}
            >
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}