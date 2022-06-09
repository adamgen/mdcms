import { useMemo } from 'react';
import { useRouter } from 'next/router';

export function useQuery(param: string) {
  const search = useRouter().query;

  const searchParams = useMemo(() => {
    return new URLSearchParams(search as unknown as string);
  }, [search]);

  return searchParams.get(param) ?? undefined;
}
