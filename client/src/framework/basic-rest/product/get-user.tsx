import { USER } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchUser = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.USER}/${_slug}`);
  return data.data;
};
export const useUserQuery = (slug: string) => {
  return useQuery<USER, Error>([API_ENDPOINTS.USER, slug], () =>
    fetchUser(slug)
  );
};
