import React, {useContext, useState} from "react";
import "./MessageInput.css"
import {Context} from "../../context";
import {useDispatch, useSelector} from "react-redux";
import {inputText} from "../../toolkit/toolkitSlice";
import {Link} from "react-router-dom";
import axios from "axios";

const MessageInput = () => {
    const {toggleTodo} = useContext(Context)
    const [inText, setInText] = useState('')
    const dispatch = useDispatch()
    const chat = useSelector(state => state.toolkit.chat)
    const activeUser = useSelector(state => state.toolkit.users.activeUser)
    function handleSubmit(e) {
        if (!chat.editModal) {
            const User = {
                "id": `80e00b40-1b8f-11e8-9629-${new Date().getTime()}`,
                "userId": activeUser.userId,
                "avatar": activeUser.avatar,
                "user": activeUser.username,
                "text": `${chat.inputText}`,
                "createdAt": `${new Date().toISOString()}`,
                "editedAt": "",
            }
            dispatch(inputText(""))
            setInText("")
            toggleTodo(User);
        }
        e.preventDefault();
    }
    function logout() {
        axios.put("http://localhost:3020/activeUser", {})
            .then(() => {})
            .catch(err => alert(err));
        window.location.assign("http://localhost:3000/login")
    }
    return (
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <div className="message-input-text">
                    <input type="text" value={inText} onChange={e => {
                        dispatch(inputText(e.target.value))
                        setInText(e.target.value)
                    }}/>
                </div>
                <div className="message-input-button">
                    <input type="submit" value="Send"/>
                </div>
                <div className="logout-input">
                    <input type="button" value="Logout" onClick={logout}/>
                </div>
                {activeUser.role === 'admin' ? <div className="users-link-container"><Link to="/users" className="users-link">Users</Link></div> : true}
            </form>
        </div>
    );
}

export default MessageInput;
