import React from 'react';
import { Typography, Skeleton } from '@mui/material';

interface ProductNameProps {
  name: string;

  mobile?: boolean;

  loaded: boolean;
}

function ProductName({ name, mobile, loaded }: ProductNameProps) {
  return loaded ? (
    <Typography
      variant="h5"
      component="h1"
      sx={{
        display: mobile
          ? { xs: 'block', md: 'none' }
          : { xs: 'none', md: 'block' },
      }}
    >
      {name}
    </Typography>
  ) : (
    <Skeleton
      variant="text"
      height={40}
      width={240}
      sx={{
        display: mobile
          ? { xs: 'block', md: 'none' }
          : { xs: 'none', md: 'block' },
      }}
    />
  );
}

ProductName.defaultProps = {
  mobile: false,
};

export default ProductName;
