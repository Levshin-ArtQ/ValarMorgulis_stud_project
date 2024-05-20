import { useState } from 'react';
import axios from 'axios';
import authHeader from '../services/auth-header';
const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  

  const fetchData = async (endpoint, options = {}) => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios({
        ...options,
        url: endpoint,
        headers: {
          ...authHeader()['x-access-token'],
        },
        params: {
          ...options.params,
          userId, // Добавление userId в параметры запроса, если это необходимо
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useApi;