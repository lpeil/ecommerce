import React from 'react';
import { Typography, Box } from '@mui/material';

import PriceSlider from '../PriceSlider';
import NameSearch from '../NameSearch';
import FiltersChips from '../FiltersChips';

import '../filters.style.scss';

interface HomeLeftMenuProps {
  highestPrice: number;
}

function HomeLeftMenu({ highestPrice }: HomeLeftMenuProps): JSX.Element {
  return (
    <Box className="left-menu" sx={{ display: { xs: 'none', md: 'block' } }}>
      <Typography variant="h5">Filters</Typography>
      <FiltersChips highestPrice={highestPrice} />
      <NameSearch />
      <PriceSlider highestPrice={highestPrice} />
    </Box>
  );
}

export default HomeLeftMenu;
