import { useLocation } from 'react-router-dom';
import * as React from 'react';

export function useQuery(param: string) {
  const { search } = useLocation();

  return (
    React.useMemo(() => new URLSearchParams(search), [search]).get(param) ??
    undefined
  );
}
