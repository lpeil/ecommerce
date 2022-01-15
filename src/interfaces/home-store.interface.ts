interface HomeStoreInterface {
  filters: {
    name: string;

    price: number[];
  };

  orderBy: {
    field: 'id' | 'name' | 'price';

    order: 'asc' | 'desc';
  };
}

export default HomeStoreInterface;
