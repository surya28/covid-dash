import { useEffect, useState } from "react";

const useApi = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '055738466amshf72332451b87e9ep1bdf54jsn6ed2866662a5',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };

  const refetch = async () => {
    try {
      const response = await fetch(url, options)
      const result = await response.json();
      setLoading(false);
      setData(result.response);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    refetch(url);
  }, []);

  return { loading, data, error, refetch };
};

export default useApi;
