import {useState, useCallback} from "react";

/*
* useState대신 useReducer를 사용해서 구현해보기.
* reducer에서 사용할 액션 : change, reset
* 답은 튜토리얼 문서에 있음. https://react.vlpt.us/basic/21-custom-hook.html
* */

function UseInputs(initialForm) {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        setForm(form => ({...form, [name]:value}));
    }, [])

    const reset = useCallback(() => {
        setForm(() => initialForm);
    }, [initialForm])

    return [form, onChange, reset];
}

export default UseInputs;