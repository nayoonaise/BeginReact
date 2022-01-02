import React from "react";

function UserList({user, onRemove, onToggle}) {
    return (
        <>
            {
                user.map(x => <User key={x.id} user={x} onRemove={onRemove} onToggle={onToggle}/>)
            }
        </>
    );
}


const User = React.memo(function User({user, onRemove, onToggle}) {

    /*useEffect(() => {
        console.log(`Hello ${user.id}`)
        return () => {
            console.log(`Goodbye ${user.id}`)
        }
    }, [])*/

    const {username, email, id, active} =user;
    return (<>
        <div>
            <b style={{
                color: active ? 'red' : 'black',
                cursor: active ? 'pointer' : 'default'
            }}>
                <span onClick={() => onToggle(id)}> ({id}) {username} / {email} </span>
                <button onClick={() => onRemove(id)}>X</button>
            </b>
        </div>
    </>)
});

export default React.memo(UserList,
    (prevProps, nextProps) => nextProps.users === prevProps.users );