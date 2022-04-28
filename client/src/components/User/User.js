import React, {useEffect} from "react";
import "./User.css"
import {
    createStatus,
    setMessages,
    setUsers
} from "../../toolkit/toolkitSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";

const User = (props) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.toolkit.users.users)
    const messages = useSelector(state => state.toolkit.chat.messages)

    useEffect(() => {
        axios.get("http://localhost:3020/messages")
            .then(res => {
                dispatch(setMessages(res.data))
            })
            .catch(err => alert(err));
        axios.get("http://localhost:3020/users")
            .then(res => {
                dispatch(setUsers(res.data))
            })
            .catch(err => alert(err));
    }, [])

    async function deleteUser() {
        await axios.delete(`${props.url}/${props.item.id}`)
            .then(() => {})
            .catch(err => alert(err));

        for (let user of users) {
            if (user.id !== props.item.id) await axios.post(props.url, user)
                .then(() => {})
                .catch(err => alert(err));
        }
        for (let message of messages) {
            await axios.post("http://localhost:3020/messages", message)
                .then(() => {})
                .catch(err => alert(err));
        }
        const newUsers = users.filter(el => el.id !== props.item.id)
        dispatch(setUsers(newUsers))
    }

    return (
        <div className="user-component">
            <div className="user-info">
                <div className="user-info-username">
                    username: {props.item.username}
                </div>
                <div className="user-info-password">
                    password: {props.item.password}
                </div>
            </div>
            <div className="edit-user-button">
                <Link to="/users/edit" className="edit-user-link" onClick={() => dispatch(createStatus({status: true, type: 'edit', id: props.item.id}))}>Edit</Link>
            </div>
            <div className="delete-user-button">
                <input type="button" value="Delete" onClick={deleteUser}/>
            </div>
        </div>
    );
}

export default User;