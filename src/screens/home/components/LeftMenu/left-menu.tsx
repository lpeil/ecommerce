import React from 'react';
import { Typography, TextField, InputAdornment, Slider } from '@mui/material';
import { Search } from '@mui/icons-material';

function HomeLeftMenu() {
  const sliderTextValue = (value: number) => `$ ${value}.00`;

  return (
    <div className="left-menu">
      <Typography variant="h5">Filters</Typography>
      <div className="filter">
        <Typography variant="h6">Search by name</Typography>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="filter">
        <Typography variant="h6">Price Range</Typography>
        <Slider
          max={500}
          value={[0, 500]}
          valueLabelDisplay="auto"
          getAriaLabel={() => 'Price slider'}
          getAriaValueText={sliderTextValue}
          disableSwap
        />
      </div>
    </div>
  );
}

export default HomeLeftMenu;
