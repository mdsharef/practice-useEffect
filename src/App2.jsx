import { useEffect, useState } from "react";


let timeInterval = null;
const App = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [timeCount, setTimeCount] = useState(5);
    // useEffect(() => {
    //     document.getElementById('btn').innerHTML = 'Reduce';
    //     console.log('I am called');
    // })
    // if(count == 6) {
    //     setLock(true);
    // }
    useEffect(()=>{
        if(count == 6) {
            setLock(true);
        }
        // console.log('Count', count);
    }, [count]);

    // useEffect(() => {
    //     let timer = null;
    //     if(lock) {
    //         timer = setTimeout(() => {
    //             setCount(0);
    //             setLock(false);
    //             clearTimeout(timer);
    //         }, 3000)
    //     }
    //     console.log('Calling from second useEffect');
    // }, [lock])

    // let timer = null;
    // useEffect(() => {
    //     if(lock && timeCount !== 0) {
    //         timer = setInterval(() => {
    //             setTimeCount(timeCount - 1);
    //             if(timeCount === 0) {
    //                 setCount(0);
    //                 setLock(false);
    //                 clearInterval(timer);
    //             }
    //             console.log('from timer', timeCount);
    //         }, 1000)
    //     }
    //     // console.log('Calling from second useEffect');
    // }, [lock, timeCount])

    // console.log('Count', count, 'Lock', lock);

    /**
     * Fresh Start: -
     * 1. create an interval for timeCount
     * 2. after finishing interval, set count to 0, set lock to false and set timeCount to 5 
     */

    useEffect(()=> {
        if(lock && timeInterval === null) {
            timeInterval = setInterval(()=> {
                setTimeCount(prev => prev - 1);
                console.log('timeCount', timeCount);
            }, 1000)
        }
    }, [lock]);

    useEffect(()=> {
        if(timeCount === 0) {
            clearInterval(timeInterval);
            setCount(0);
            setLock(false);
            setTimeCount(5);
        }
        console.log(timeCount);
    }, [timeCount]);

    return (
        <div>
            <h3>Count: {count}</h3>
            <button id='btn' disabled={lock} onClick={() => setCount(count + 1)}>Add {lock && `('locked'-${timeCount})`}</button>
        </div>
    )
}

export default App;