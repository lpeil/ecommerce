import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Slider } from '@mui/material';

import { setHomePriceFilter } from '../../../../store/modules/home/home.actions';

import StoreInterface from '../../../../interfaces/store.interface';
import HomeStoreInterface from '../../../../interfaces/home-store.interface';

interface PriceSliderProps {
  highestPrice: number;
}

function PriceSlider({ highestPrice }: PriceSliderProps) {
  const dispatch = useDispatch();

  const homeOptions: HomeStoreInterface = useSelector(
    (state: StoreInterface) => state.home,
  );

  const sliderTextValue = (value: number) => `$ ${value}.00`;

  const priceInitialValue: number[] = [0, highestPrice];

  const changePriceFilter = (event: Event, value: number[] | number) => {
    dispatch(setHomePriceFilter(value));
  };

  useEffect(() => {
    dispatch(setHomePriceFilter(priceInitialValue));
  }, [highestPrice]);

  return (
    <div className="filter">
      <Typography variant="h6">Price Range</Typography>
      <Slider
        name="price-search"
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
  );
}

export default PriceSlider;
