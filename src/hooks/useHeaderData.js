import { useQuery } from 'react-query';

import { getSiteHeaderData } from '@/util/api';

export const useHeaderData = () => {
  return useQuery('headerData', getSiteHeaderData);
};
