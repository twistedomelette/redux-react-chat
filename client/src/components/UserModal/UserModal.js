import React, {useEffect, useState} from "react";
import "./UserModal.css"
import {useDispatch, useSelector} from "react-redux";
import {addUser, createStatus, setUsers} from "../../toolkit/toolkitSlice";
import axios from "axios";

const UserModal = () => {
    const [info, setInfo] = useState({username: "", password: "", userId: "", avatar: ""})
    const dispatch = useDispatch()
    const users = useSelector(state => state.toolkit.users.users)
    const userModal = useSelector(state => state.toolkit.users.userModal)
    const url = "http://localhost:3020/users"

    useEffect(() => {
        if (userModal.type === "edit") {
            const userWithId = users.find(el => el.id === userModal.id)
            setInfo({...userWithId})
        }
    }, [])

    function submitHandler(e) {
        if (userModal.type === "add") {
            const newUser = {
                ...info,
                userId: `533b5230-1b8f-11e8-9629-${new Date().getTime()}`,
                role: "user",
                id: `${users.length}${new Date().getTime()}`,
                likes: []
            }
            axios.post(url, newUser)
                .then((res) => {
                        dispatch(addUser(res.data))
                        dispatch(createStatus({status: false, type: 'add', id: ''}))
                        window.location.assign("http://localhost:3000/users")
                    }
                )
                .catch(err => alert(err));
        } else {
            const startUsers = [...users].splice(0, userModal.id)
            const finishUsers = [...users].splice(+userModal.id+1)
            axios.put(`${url}/${userModal.id}`, info)
                .then(res => {
                    dispatch(setUsers([...startUsers, res.data, ...finishUsers]))
                    dispatch(createStatus({status: false, type: 'edit', id: ''}))
                })
                .catch(err => alert(err));
        }
        e.preventDefault()
    }
    useEffect(() => {
        if (!userModal.status) window.location.assign("http://localhost:3000/users")
    }, [userModal])

    return (
        <form onSubmit={submitHandler} className="form-user">
            <div className="form-log-user">
                <h2 className="create-user">{userModal.type === "add" ? "Create User" : "Edit"}</h2>
                <div className="form-group-user">
                    <label>Username: </label>
                    <input type="text" value={info.username} onChange={e => setInfo({...info, username: e.target.value})}/>
                </div>
                <div className="form-group-user">
                    <label>Password: </label>
                    <input type="text" value={info.password} onChange={e => setInfo({...info, password: e.target.value})}/>
                </div>
                <div className="form-group-user">
                    <label>Avatar: </label>
                    <textarea cols="40" rows="3" value={info.avatar} onChange={e => setInfo({...info, avatar: e.target.value})}/>
                </div>
                <div className="group-buttons">
                    <input type="submit" value="Create"/>
                    <input type="button" value="Cancel" onClick={() => dispatch(createStatus({status: false, type: `${userModal.type}`}))}/>
                </div>
            </div>
        </form>
    );
}

export default UserModal;