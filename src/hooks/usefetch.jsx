import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { baseURl } from '../api/baseURL';

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
const usePostFetch = (url , datas = null ,token ) => {
    const { auth, setAuth } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setTimeout(() => {
        fetch(baseURl + '/api/Show_Not_Active_Resturants' , {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify(datas),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.atoken}`,
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
        // }, 1000);
    }, [url])

    return { data, isPending, error };
}


export {useGetFetch , usePostFetch};