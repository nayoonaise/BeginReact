import { useCallback, useReducer} from "react";

/*
* useState대신 useReducer를 사용해서 구현해보기.
* reducer에서 사용할 액션 : change, reset
* 답은 튜토리얼 문서에 있음. https://react.vlpt.us/basic/21-custom-hook.html
* */

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_VALUE":
            return {...state, [action.name]: action.value};
        case "RESET_VALUE":
            return action.value;
        default:
            throw new Error("unhandled action");
    }
}

function UseInputs(initialForm) {
    // const [form, setForm] = useState(initialForm);
    const [form, dispatch] = useReducer(reducer, initialForm);

    const onChange = useCallback(e => dispatch({
        type: "CHANGE_VALUE",
        name: e.target.name,
        value: e.target.value
    }), [])

    const reset = useCallback(() => {
        dispatch({
            type: "RESET_VALUE",
            value: initialForm
        })
    }, [initialForm])

    return [form, onChange, reset];
}

export default UseInputs;