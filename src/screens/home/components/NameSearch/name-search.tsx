import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import { setHomeNameFilter } from '../../../../store/modules/home/home.actions';

import StoreInterface from '../../../../interfaces/store.interface';
import HomeStoreInterface from '../../../../interfaces/home-store.interface';

function NameSearch() {
  const dispatch = useDispatch();

  const homeOptions: HomeStoreInterface = useSelector(
    (state: StoreInterface) => state.home,
  );

  const changeNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === homeOptions.filters.name) return;

    dispatch(setHomeNameFilter(value));
  };

  return (
    <div className="filter">
      <Typography variant="h6">Search by name</Typography>
      <TextField
        name="name-search"
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
  );
}

export default NameSearch;
