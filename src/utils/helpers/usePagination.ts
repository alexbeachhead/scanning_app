import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

export interface PaginationProps<T> {
  initialPage?: number;
  query?: string;
  paginationSlice: any;
  limit: number;
}

export const usePagination = <T>({initialPage = 1, query = '', paginationSlice, limit}: PaginationProps<T>) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [isEndReached, setIsEndReached] = useState(false);
  const [prevQuery, setPrevQuery] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseData = await dispatch(paginationSlice({page, limit, query})).unwrap();

      if (responseData) {
        const {limit, page: currentPage, total, data} = responseData;

        setIsEndReached(+limit * +currentPage >= total);
        setData(prevData => (page === 1 ? data : [...prevData, ...data]));
      }
    } catch (fetchError: any) {
      setError(fetchError.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query !== prevQuery) {
      setPage(1);
      setPrevQuery(query);
      setData([]);
    }
  }, [query, prevQuery]);

  useEffect(() => {
    if (!initialLoad) {
      fetchData();
    }
  }, [page, query]);

  useEffect(() => {
    fetchData();
    setInitialLoad(false);
  }, []);

  const loadNextPage = () => {
    if (!loading && !isEndReached) {
      setPage(page + 1);
    }
  };

  const reset = (withDataClean: boolean = true) => {
    setPage(1);
    if (withDataClean) {
      setData([]);
    }
    fetchData();
  };

  return {
    page,
    loading,
    error,
    data,
    loadNextPage,
    reset,
  };
};
