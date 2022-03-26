import axios from 'axios';
import { useEffect, useState } from "react";

/**
 * 
 * Fetch data from a URL
 * 
 * @param {String} url - URL for getting data
 * @returns {Object} { data, isPending, setIsPending, error }
 */
const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        
        axios.get(url)
            .then(({ data }) => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    }, [url]);

    return { data, setData, isPending, setIsPending, error };
};

export default useFetchData;