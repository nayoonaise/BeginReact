import React, { useContext } from "react";
import { UserDispatch } from "./App";

function UserList({user}) {
    return (
        <>
            {
                user.map(x => <User key={x.id} user={x} />)
            }
        </>
    );
}


const User = React.memo(function User({user}) {

    /*useEffect(() => {
        console.log(`Hello ${user.id}`)
        return () => {
            console.log(`Goodbye ${user.id}`)
        }
    }, [])*/

    const {username, email, id, active} = user;
    const dispatch = useContext(UserDispatch);

    return (<>
        <div>
            <b style={{
                color: active ? 'red' : 'black',
                cursor: active ? 'pointer' : 'default'
            }}>
                <span onClick={() => dispatch({type:"TOGGLE_USER", id})}> ({id}) {username} / {email} </span>
                <button onClick={() => dispatch({type:"REMOVE_USER", id})}>X</button>
            </b>
        </div>
    </>)
});

export default React.memo(UserList);