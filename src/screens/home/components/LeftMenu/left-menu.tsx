import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, InputAdornment, Slider } from '@mui/material';
import { Search } from '@mui/icons-material';

import {
  setHomeNameFilter,
  setHomePriceFilter,
} from '../../../../store/modules/home/home.actions';

import StoreInterface from '../../../../interfaces/store.interface';
import HomeStoreInterface from '../../../../interfaces/home-store.interface';

interface HomeLeftMenuProps {
  highestPrice: number;
}

function HomeLeftMenu({ highestPrice }: HomeLeftMenuProps): JSX.Element {
  const dispatch = useDispatch();

  const homeOptions: HomeStoreInterface = useSelector(
    (state: StoreInterface) => state.home,
  );

  const sliderTextValue = (value: number) => `$ ${value}.00`;

  const changeNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === homeOptions.filters.name) return;

    dispatch(setHomeNameFilter(value));
  };

  const changePriceFilter = (event: Event, value: number[] | number) => {
    dispatch(setHomePriceFilter(value));
  };

  useEffect(() => {
    dispatch(setHomePriceFilter([0, highestPrice]));
  }, [highestPrice]);

  return (
    <div className="left-menu">
      <Typography variant="h5">Filters</Typography>
      <div className="filter">
        <Typography variant="h6">Search by name</Typography>
        <TextField
          value={homeOptions.filters.name}
          onChange={changeNameFilter}
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
          max={highestPrice || 0}
          value={homeOptions.filters.price}
          onChange={changePriceFilter}
          valueLabelDisplay="auto"
          getAriaLabel={() => 'Price slider'}
          getAriaValueText={sliderTextValue}
          valueLabelFormat={sliderTextValue}
          disableSwap
        />
      </div>
    </div>
  );
}

export default HomeLeftMenu;
