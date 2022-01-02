import React, { useContext, useRef} from 'react';
import useInputs from "./UseInputs";
import {UserDispatch} from "./App";

function CreateUser() {
    const [{ username, email }, onChange, reset] = useInputs({ username: '', email:'' });
    const id = useRef(4);
    const dispatch = useContext(UserDispatch);

    /*
        useCallback을 했다가 해제.
        어차피 dep:[email, username, reset]이라
        username/email값 입력 시 마다 onCreate가 계속 재생성되므로
        useCallback이 무의미.
    */
    const onCreate = () => {
        dispatch({
            type: "CREATE_USER",
            user:{ id: id.current, username, email, active:false }
        });
        id.current += 1;
        reset();
    }

    return (
        <div>
            <input
                name="username"
                placeholder="username"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="email"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}
export default React.memo(CreateUser);