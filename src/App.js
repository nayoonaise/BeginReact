import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function App() {

  const [inputs, setInputs] = useState({
    username:'',
    email: '',
  })
  const {username, email} = inputs;
  const [users, setUsers] = useState([
    {id: 1, username: 'A', email:'1', active: true},
    {id: 2, username: 'B', email:'2', active: true},
    {id: 3, username: 'C', email:'3', active: false}
  ]);
  const nextId = useRef(4);
  const count = useMemo(() => countActive(users), [users])


  const onChange = useCallback(e => {
    const {value, name} = e.target;
    setInputs(inputs => { return {
      ...inputs,
      [name]: value
    }})
  }, [])

  const onCreate = useCallback(() => {
    const newUser = {
      id: nextId.current,
      username: username,
      email: email,
      active:true,
    }
    setUsers(users => users.concat(newUser))
    setInputs({email:'', username:''})
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    setUsers(users => users.filter(x => x.id !== id));
    nextId.current -= 1;
  }, []);

  const onToggle = useCallback((id) => {
    setUsers(users => users.map(x => x.id===id ? {...x, active:!x.active} : x))
  }, []);

  return (
      <div>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />

        <UserList user={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성 사용자 수 : {count} </div>
      </div>
  )
}

function countActive(users) {
  console.log("Counting users");
  return users.filter(x=>x.active).length;
}

export default App;
