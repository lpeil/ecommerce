import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Chip, Stack } from '@mui/material';

import PriceSlider from '../PriceSlider';
import NameSearch from '../NameSearch';

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

  const priceInitialValue: number[] = [0, highestPrice];

  const deleteFilterName = () => {
    dispatch(setHomeNameFilter(''));
  };

  const deleteFilterPrice = () => {
    dispatch(setHomePriceFilter(priceInitialValue));
  };

  useEffect(() => {
    dispatch(setHomePriceFilter(priceInitialValue));
  }, [highestPrice]);

  return (
    <div className="left-menu">
      <Typography variant="h5">Filters</Typography>
      <Stack direction="column" spacing={1} className="stack">
        {homeOptions.filters.name ? (
          <Chip onDelete={deleteFilterName} label={homeOptions.filters.name} />
        ) : null}
        {homeOptions.filters.price[0] !== priceInitialValue[0] ||
        homeOptions.filters.price[1] !== priceInitialValue[1] ? (
          <Chip
            onDelete={deleteFilterPrice}
            label={`$ ${homeOptions.filters.price[0]} - $ ${homeOptions.filters.price[1]}`}
          />
        ) : null}
      </Stack>
      <NameSearch />
      <PriceSlider highestPrice={highestPrice} />
    </div>
  );
}

export default HomeLeftMenu;
