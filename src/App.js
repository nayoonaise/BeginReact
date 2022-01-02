import React, {useCallback, useMemo, useReducer, useRef, createContext } from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UseInputs from "./UseInputs";

const initialState = {
    users: [
        {id: 1, username: 'A', email: '1', active: true},
        {id: 2, username: 'B', email: '2', active: true},
        {id: 3, username: 'C', email: '3', active: false},
    ]
}

function reducer(state, action) {
    switch (action.type) {

        case "CREATE_USER":
            return {
                ...state,
                inputs: initialState.inputs,
                users: state.users.concat(action.user)
            }
        case "TOGGLE_USER":
            return {
                ...state,
                users: state.users.map(user => user.id === action.id ? {...user, active: !user.active} : {...user})
            };
        case "REMOVE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        default:
            throw new Error("Unhandled action");
    }
}
export const UserDispatch = createContext(null);

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [form, onChange, reset] = UseInputs({
        username: '',
        email: ''
    });
    const {username, email} = form;

    const {users} = state;
    const nextId = useRef(4);

    const onCreate = useCallback(() => {
        dispatch({
            type: "CREATE_USER",
            user: {id: nextId.current, username, email}
        })
        nextId.current += 1;
        reset();  //22강. reset 안넣어도 상관없지만 ESLint규칙 상 걍 넣음. ({username,email}에서 생성된 UseInputs산출물은 리렌더되어도 유지되므로?)
    }, [username, email, reset]);


    const count = useMemo(() => countActive(users), [users]);

    return (
        <UserDispatch.Provider value={dispatch}>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />

            <UserList
                user={users}
            />
            <div>활성 사용자 수 : {count} </div>
        </UserDispatch.Provider>
    )
}

function countActive(users) {
    console.log("Counting users");
    return users.filter(x => x.active).length;
}

export default App;
