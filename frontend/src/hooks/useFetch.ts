import { useState, useEffect, useCallback } from "react";

const cache = new Map<string, unknown>();

/**
 * Met à jour le cache après une mutation
 * @template T
 * @param {string} cacheKey - Clé du cache
 * @param {(oldData: T | null) => T} updateFn - Fonction pour modifier les données
 */
function updateCache<T>(cacheKey: string, updateFn: (oldData: T | null) => T) {
  const oldData = cache.get(cacheKey) as T | null;
  const newData = updateFn(oldData);
  cache.set(cacheKey, newData);
}

/**
 * Hook pour récupérer des données avec mise en cache.
 */
function useQuery<T>(cacheKey: string, asyncFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      if (cache.has(cacheKey)) {
        setData(cache.get(cacheKey) as T);
        setIsLoading(false);
        return;
      }

      try {
        const result = await asyncFunction();
        if (isMounted) {
          cache.set(cacheKey, result);
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [asyncFunction, cacheKey]);

  return { isLoading, data, error };
}

/**
 * Hook pour gérer les mutations (POST, PUT, PATCH, DELETE).
 */
function useMutation<T>(
  mutationFn: (variables?: any) => Promise<T>,
  options?: { cacheKey?: string; onSuccess?: (data: T) => void }
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const mutate = useCallback(
    async (variables?: any) => {
      setIsLoading(true);
      console.log([...cache.entries()])
      try {
        const result = await mutationFn(variables);
        setData(result);
        setError(null);

        // Mettre à jour le cache après une mutation réussie
        if (options?.cacheKey) {
          updateCache<T[]>(options.cacheKey, (oldData) => [...(oldData || []), result]);
        }

        // Exécuter la fonction onSuccess fournie
        if (options?.onSuccess) {
          options.onSuccess(result);
        }
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options?.cacheKey, options?.onSuccess]
  );

  return { mutate, isLoading, data, error };
}

/**
 * Hook pour exécuter `useQuery` avec cache.
 */
function useFetch<T>(queryKey: string, queryFn: () => Promise<T>) {
  return useQuery<T>(queryKey, queryFn);
}

export { useFetch, useMutation };
