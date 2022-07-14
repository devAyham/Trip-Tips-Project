import { useState, useEffect } from 'react';
import { baseURl } from './baseURL';

const useGetFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
        fetch(baseURl + url)
        .then(res => {
            if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err => {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
        })
        }, 1000);
    }, [url])

    return { data, isPending, error };

}
const usePostFetch = (url , datas ,token ) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
        fetch(baseURl + url , {
            method: "POST",
            body: JSON.stringify(datas),
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${token}`
            },
            credentials: "same-origin"
        })
        .then(res => {
            if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err => {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
        })
        }, 1000);
    }, [url])

    return { data, isPending, error };
}


export {useGetFetch , usePostFetch};