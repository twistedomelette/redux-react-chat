import React, {useEffect, useState} from "react";
import "./LoginForm.css"
import axios from "axios";

export const LoginForm = () => {
    const [info, setInfo] = useState({username: "", password: ""})
    const [users, setUsers] = useState();

    useEffect(async () => {
        await axios.get("http://localhost:3020/users")
            .then(res => setUsers({isLoaded: true, items: res.data}))
            .catch(err => alert(err));
    }, [])

    function submitHandler(e) {
        let user = users.items.find(el => el.username === info.username && el.password === info.password)
        if (user) {
            axios.put("http://localhost:3020/activeUser", user)
                .then(() => {
                    window.location.assign("http://localhost:3000")
                })
                .catch(err => alert(err));
        } else alert("Invalid username or password")
        e.preventDefault();
    }

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="form-log">
                <h2>Sing In</h2>
                <div className="form-group">
                    <label className="label-username">Username</label>
                    <input type="text" onChange={e => setInfo({...info, username: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label className="label-password">Password</label>
                    <input type="text" onChange={e => setInfo({...info, password: e.target.value})}/>
                </div>
                <button type="submit">Sign In</button>
            </div>
        </form>
    );
}