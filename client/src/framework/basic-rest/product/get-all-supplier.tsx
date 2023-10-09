import { Supplier } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchSupplier = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.Supplier}`);
  return data.data;
};
export const useAllSupplierQuery = () => {
  return useQuery<Supplier, Error>([API_ENDPOINTS.Supplier], () =>
    fetchSupplier()
  );
};
