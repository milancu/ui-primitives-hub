import { useQueryState } from 'nuqs';

export const useCurrentComponentStateFilter = () => {
  return useQueryState('state', {
    defaultValue: 'default',
  });
};