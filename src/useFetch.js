import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        console.log('useEffect ran');
        console.log('Fetching data from:', url);  // Log the URL for debugging
    
        fetch(url, { signal: abortCont.signal })    
            .then(res => {
                console.log('Response status:', res.status); // Log status
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                console.log('Fetched data:', data);  // Log fetched data
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Fetch error:', err.message);  // Log the error message
                    setError(err.message);
                    setIsPending(false);
                    setData(null);
                }
            });
    
        return () => abortCont.abort();  // Cleanup function
    
    }, [url]);
    
    return { data, isPending, error };
};

export default useFetch;