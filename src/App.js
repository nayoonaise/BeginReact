import React, {useCallback, useMemo, useReducer, useRef} from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";

const initialState = {
    inputs: {
        username: '',
        email: '',
    },
    users: [
        {id: 1, username: 'A', email: '1', active: true},
        {id: 2, username: 'B', email: '2', active: true},
        {id: 3, username: 'C', email: '3', active: false},
    ]
}

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_INPUT" :
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            }

        case "CREATE_USER":
            return {
                ...state,
                inputs: initialState.inputs,
                users: state.users.concat(action.user)
            }
        case "TOGGLE_USER":
            return {
                ...state,
                users: state.users.map( user => user.id === action.id ? {...user, active:!user.active }: {...user})
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

function App() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { users } = state;
    const { username, email } = state.inputs;
    const nextId = useRef(4);

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            name: name,
            value: value
        });
    }, [])

    const onCreate = useCallback(() => {
        dispatch({
            type: "CREATE_USER",
            user: { id: nextId.current, username, email }
        })
        nextId.current += 1;
    }, [username, email]);

    const onToggle = useCallback((id) => {
        dispatch({ type:"TOGGLE_USER", id })
    });

    const onRemove = useCallback((id) => {
        dispatch({ type: "REMOVE_USER", id});
    }, [])

    const count = useMemo(() => countActive(users), [users]);

    return (
        <div>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />

            <UserList
                user={users}
                onToggle={onToggle}
                onRemove={onRemove}
            />
            <div>활성 사용자 수 : {count} </div>
        </div>
    )
}

function countActive(users) {
    console.log("Counting users");
    return users.filter(x => x.active).length;
}

export default App;
