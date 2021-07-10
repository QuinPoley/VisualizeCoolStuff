import React, {useEffect, useState} from "react";


function View({name}) {
    const [count, setCount] = useState(0)

    function ViewportInitialize({props}){
        setCount(7)
    }

    useEffect(() => {
        ViewportInitialize({name})
    }, [])

    return(
        <div>
            <div className="View">{name}</div>
            <div className="View">{count}</div>
        </div>
    )
}

export default View;