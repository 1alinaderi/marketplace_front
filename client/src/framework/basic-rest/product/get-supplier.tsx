import { Supplier } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchSupplier = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.Supplier}/${_slug}`);
  return data.data;
};
export const useSupplierQuery = (slug: string) => {
  return useQuery<Supplier, Error>([API_ENDPOINTS.Supplier, slug], () =>
    fetchSupplier(slug)
  );
};
