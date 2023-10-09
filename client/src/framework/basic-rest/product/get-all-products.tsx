import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';
type PaginatedProduct = {
  data: Product[];
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  console.log(_params);
  const { data } = await http.get(
    `${API_ENDPOINTS.PRODUCTS}?${
      _params.category && 'category=' + _params.category
    }`
  );
  return data;
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts
  );
};

export { useProductsQuery, fetchProducts };
