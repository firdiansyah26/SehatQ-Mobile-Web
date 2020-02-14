import React, { useState, useEffect } from 'react'

function IntervalHookContainer() {
    const [count, setCount] = useState(0)

    const tick = () => {
        setCount(prevCount => prevCount + 1)
    }

    useEffect(() =>{
        function doSomething(){
            
        }
        doSomething()
        const interval = setInterval(tick, 1000)
        return () =>{
            clearInterval(interval)
        }
    },[])

    return (
        <div>
            {count}
        </div>
    )
}

export default IntervalHookContainer
