import React, { useMemo, useReducer, createContext } from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";

const initialState = {
    users: [
        {id: 1, username: 'A', email: '1', active: true},
        {id: 2, username: 'B', email: '2', active: true},
        {id: 3, username: 'C', email: '3', active: false}
    ]
}

function reducer(state, action) {
    switch (action.type) {

        case "CREATE_USER":
            return {
                ...state,
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
    const {users} = state;
    const count = useMemo(() => countActive(users), [users]);

    return (
        <UserDispatch.Provider value={dispatch}>
            <CreateUser/>
            <UserList user={users} />
            <div>활성 사용자 수 : {count} </div>
        </UserDispatch.Provider>
    )
}

function countActive(users) {
    console.log("Counting users");
    return users.filter(x => x.active).length;
}

export default App;
