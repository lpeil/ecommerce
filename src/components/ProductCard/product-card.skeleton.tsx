import React from 'react';
import { Box, Paper, CardContent, Skeleton } from '@mui/material';

import './product-cards.style.scss';

function ProductCard() {
  return (
    <Box className="product-card">
      <Paper elevation={0} square>
        <Skeleton variant="rectangular" width={320} height={240} />
        <CardContent>
          <Skeleton
            variant="text"
            width={140}
            height={28}
            sx={{ marginBottom: '8px' }}
          />
          <Skeleton
            variant="text"
            width={64}
            height={24}
            sx={{ marginBottom: '16px' }}
          />
          <Skeleton width={288} height={37} sx={{ margin: '0 4px' }} />
          <Skeleton width={288} height={37} sx={{ margin: '0 4px' }} />
        </CardContent>
      </Paper>
    </Box>
  );
}

export default ProductCard;
