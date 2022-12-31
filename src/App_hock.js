import { useEffect, useState } from "react";

const cacheData = {};

const useApp = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);

    const max = 10;

    // useEffect(() => {
    //     if(count > 0 && count <= max) {
    //         setLoading(true);
    //         fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
    //             .then(res => res.json())
    //             .then(data => setUser(data))
    //             .finally(()=> setLoading(false))
    //     }
    // }, [count]);

    // useEffect(()=> {
    //     if(cacheData[`user-${count}`]) {
    //         setUser(cacheData[`user-${count}`])
    //         return;
    //     }
    //     if(count > 0 && count <= max) {
    //         setLoading(true);
    //         fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setUser(data);
    //                 cacheData[`user-${count}`] = data;
    //             })
    //             .finally(() => setLoading(false));
    //     }
    // }, [count])

    const fetchDataFunc = (count) => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
            .then(res => res.json())
            .then(data => {
                cacheData[`user-${count}`] = data;
                return data;
            }    
        )
    }

    useEffect(() => {
        if(cacheData[`user-${count}`]) {
            setUser(cacheData[`user-${count}`]);
            return;
        }
        if(count > 0 && count < max) {
            setLoading(true);
            fetchDataFunc(count)
                .then(data => setUser(data))
                .finally(() => setLoading(false));
        }

    }, [count]);

    useEffect(() => {
        if(!cacheData[`user-${count + 1}`] && count < max) {
            fetchDataFunc(count + 1);
        }
    }, [count]);

    const handleNext = () => {
        if(count < max) {
            setCount(prev => prev + 1);
        }
    }

    const handlePrev = () => {
        if(count > 1) {
            setCount(prev => prev - 1);
        }
    }

    return {
        user,
        loading,
        count,
        max,
        handlePrev,
        handleNext
    }
}

export default useApp;