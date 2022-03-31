import * as React from 'react';
import { useRouter } from 'next/router';

export function useQuery(param: string) {
  // const { search } = useLocation();
  const search = useRouter().query;

  return (
    // @ts-ignore
    React.useMemo(() => new URLSearchParams(search), [search]).get(param) ??
    undefined
  );
}
