import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { baseURl } from "../api/baseURL";

const useAxiosGet = (dataUrl ,flag) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url ,token) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "no-cors",
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(baseURl + dataUrl , auth.atoken);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl , auth.atoken ,flag]);

  return { data, fetchError, isLoading };
};
const useAxiosPost = (dataUrl, flag = false, body = null) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url, body, token) => {
      setIsLoading(true);
      try {
        const response = await axios.post(url, JSON.stringify(body), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "no-cors",
          withCredentials: true,
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(baseURl + dataUrl, body, auth.atoken);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [dataUrl, body, auth.atoken, flag]);

  return { data, fetchError, isLoading };
};

export { useAxiosGet, useAxiosPost };
