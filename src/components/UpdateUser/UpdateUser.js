import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState('');
    const {id} = useParams();

    useEffect( ()=>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    },[]);
    const handleNameChange = e =>{
        const updateName = e.target.value;
        
        const updateUser = {name: updateName, email: user.email};
        setUser(updateUser);
    }
    const handleEmailChange = e =>{
        const updateEmail = e.target.value;
        const updateUser = {name: user.name, email: updateEmail}
        setUser(updateUser)
    }
    const handleUpdateUser = e =>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                  alert('updated successfully')
                  setUser({})
            }
        })
        e.preventDefault()
        
    }
    return (
        <div>
            <h2>Update User: {user.name}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user.name || ""} />
                <input type="email" onChange={handleEmailChange} value={user.email || ""} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;