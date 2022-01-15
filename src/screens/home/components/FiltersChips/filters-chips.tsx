import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Stack } from '@mui/material';

import {
  setHomeNameFilter,
  setHomePriceFilter,
} from '../../../../store/modules/home/home.actions';

import StoreInterface from '../../../../interfaces/store.interface';
import HomeStoreInterface from '../../../../interfaces/home-store.interface';

interface FiltersChipsProps {
  highestPrice: number;
}

function FiltersChips({ highestPrice }: FiltersChipsProps) {
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
  );
}

export default FiltersChips;
