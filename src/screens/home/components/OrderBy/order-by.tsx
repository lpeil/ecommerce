import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material';

import { changeOrderBy } from '../../../../store/modules/home/home.actions';

import './order-by.style.scss';

import StoreInterface from '../../../../interfaces/store.interface';
import HomeStoreInterface from '../../../../interfaces/home-store.interface';

function HomeOrder() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState<string>('');

  const homeOptions: HomeStoreInterface = useSelector(
    (state: StoreInterface) => state.home,
  );

  const orders: {
    name: string;
    field: 'id' | 'name' | 'price';
    order: 'asc' | 'desc';
  }[] = [
    { name: 'Featured', field: 'id', order: 'asc' },
    { name: 'Price: Low to High', field: 'price', order: 'asc' },
    { name: 'Price: High to Low', field: 'price', order: 'desc' },
    { name: 'Name: A to Z', field: 'name', order: 'asc' },
    { name: 'Name: Z to A', field: 'name', order: 'desc' },
  ];

  const handleSelectChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    const order = orders.find((o) => o.name === event.target.value);

    if (order) {
      dispatch(changeOrderBy(order.field, order.order));
    }
  };

  useEffect(() => {
    const order = orders.find(
      (o) =>
        o.field === homeOptions.orderBy.field &&
        o.order === homeOptions.orderBy.order,
    );

    if (order) {
      setSelectedValue(order.name);
    }
  }, [homeOptions.orderBy]);

  return (
    <Box className="order" sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Typography variant="body1">Order by</Typography>
      <Select
        name="product-order-by"
        onChange={handleSelectChange /* @ts-ignore */}
        value={selectedValue}
      >
        {orders.map((order) => (
          <MenuItem key={order.name} value={order.name}>
            {order.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default HomeOrder;
