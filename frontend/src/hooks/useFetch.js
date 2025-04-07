import {  useEffect, useState } from 'react'


const useFetch = (url) => {          //here url is the parameter because usefetch expects a url
  
 

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(()=>{
        const fetchData = async() => {
            setLoading(true);          //when try to start fetching data make loading as true

            try {

                const token = localStorage.getItem('token');

                const res = await fetch(url, {
                    
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(!res.ok) {
                    setError('Failed to fetch!');

                }

                const result = await res.json();
                setData(result.data);
                setLoading(false)     //once fetched the data make loading as false.
            } catch(error) {

                 setError(error.message);
                 setLoading(false);
            }
        } 

        fetchData();

    },[url])  // here we passed url as dependency.

    return {

        data, 
        error, 
        loading
    }
}

export default useFetch