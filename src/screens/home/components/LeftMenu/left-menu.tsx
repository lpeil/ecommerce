import React from 'react';
import { Typography } from '@mui/material';

import PriceSlider from '../PriceSlider';
import NameSearch from '../NameSearch';
import FiltersChips from '../FiltersChips';

interface HomeLeftMenuProps {
  highestPrice: number;
}

function HomeLeftMenu({ highestPrice }: HomeLeftMenuProps): JSX.Element {
  return (
    <div className="left-menu">
      <Typography variant="h5">Filters</Typography>
      <FiltersChips highestPrice={highestPrice} />
      <NameSearch />
      <PriceSlider highestPrice={highestPrice} />
    </div>
  );
}

export default HomeLeftMenu;
