import React, {useEffect} from "react";
import {createStatus, setUsers} from "../../toolkit/toolkitSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import User from "../User/User";
import "./Users.css"
import axios from "axios";

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.toolkit.users.users)
    const url = "http://localhost:3020/users"
    useEffect(async () => {
        axios.get(url)
            .then(res => dispatch(setUsers(res.data)))
            .catch(error => alert(error))
    }, [])


    return (
        <div className="users-list">
            <div className="add-user-button">
                <Link to='/users/edit' className="add-user-link" onClick={() => dispatch(createStatus({status: true, type: 'add', id: ''}))}>Add User</Link>
            </div>
            <div className="back-user-link">
                <Link to="/" className="user-link">Back to chat</Link>
            </div>
            <div className="all-users-container">
                <ul>
                    {users.map((item) => (
                        item.role === 'user' ? <li key={item.userId}>
                            <User item={item} url={url}/>
                        </li> : true
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Users;