import React, {useState} from "react";

function Counter() {
    let localNum = 0;
    const [number, setNumber] = useState(0);

    const onIncrease = function(){
        localNum+=1;
        setNumber(number+1)
        if(number > 3) { console.log(localNum)}
    }
    const onDecrease = () => {
        localNum--;
        setNumber(prev => prev-1);
    }

    return (
        <div>
            <h1>number: {number}</h1>
            <h1> localNum: {localNum}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;