import React, { useState, useRef } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { FilterAltOutlined, Close } from '@mui/icons-material';

import NameSearch from '../NameSearch';
import PriceSlider from '../PriceSlider';
import OrderBy from '../OrderBy';

import '../filters.style.scss';

interface MobileFiltersProps {
  highestPrice: number;
}

function MobileFilters({ highestPrice }: MobileFiltersProps) {
  const boxRef = useRef();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{ display: { xs: 'flex', md: 'none' } }}
      className="mobile-filters"
      ref={boxRef}
    >
      <Button endIcon={<FilterAltOutlined />} onClick={toggleDrawer}>
        Filters
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        className="filters-drawer"
      >
        <div className="filters-content">
          <div className="filters-head">
            <div />
            <Typography variant="h6">FILTERS</Typography>
            <Close onClick={toggleDrawer} />
          </div>
          <OrderBy />
          <NameSearch />
          <PriceSlider highestPrice={highestPrice} />
        </div>
      </Drawer>
    </Box>
  );
}

export default MobileFilters;
