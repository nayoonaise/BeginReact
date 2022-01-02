import React, { useMemo, useReducer, createContext } from 'react';
import produce from 'immer';
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
            return produce(state, draft => {draft.users.push(action.user)})
        case "TOGGLE_USER":
            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id)
                user.active = !user.active
            })
        case "REMOVE_USER":
            return produce(state, draft => {
                const idx = draft.users.findIndex(user => user.id !== action.id);
                draft.users.splice(idx,1);
            })
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
