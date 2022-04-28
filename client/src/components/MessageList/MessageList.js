import React, {useEffect} from "react";
import "./MessageList.css"
import Message from "../Message/Message";
import OwnMessage from "../OwnMessage/OwnMessage";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setActiveUser, setLike, setUsers} from "../../toolkit/toolkitSlice";

const MessageList = () => {
    const messages = useSelector(state => state.toolkit.chat.messages)
    const activeUser = useSelector(state => state.toolkit.users.activeUser)
    const dispatch = useDispatch()
    let lastDate;
    const MillisecondsInADay = 86400000;
    function newDate(item, index) {
        if (index === 0) {
            lastDate = {...item};
            return dateType(item.createdAt);
        } else if (new Date(lastDate.createdAt).getDate() !== new Date(item.createdAt).getDate()
            || new Date(item.createdAt).getTime() - new Date(lastDate.createdAt).getTime() > MillisecondsInADay) {
            lastDate = {...item};
            return dateType(item.createdAt);
        }
    }
    function dateType(item) {
        const nowDate = new Date().getDate();
        const lastDate = new Date(item).getDate();
        const value = nowDate - lastDate;
        const Milliseconds = new Date().getTime() - new Date(item).getTime();
        if (value === 0 && Milliseconds < MillisecondsInADay) {
            return "Today";
        } else if ((value === 1 || value < 0) && Milliseconds < 2 * MillisecondsInADay) {
            return "Yesterday";
        } else return new Date(item).toDateString();
    }

    function setDate(info) {
        let date;
        if (info.user.editedAt)
            date = `${new Date(info.user.editedAt).getHours()}:${new Date(info.user.editedAt).getMinutes()}`
        else
            date = `${new Date(info.user.createdAt).getHours()}:${new Date(info.user.createdAt).getMinutes()}`
        if (date) {
            let arrDate = date.split(':');
            return arrDate.map(el => {
                if (el.length !== 2)
                    return '0' + el;
                else
                    return el;
            })
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3020/activeUser")
            .then(res => {
                dispatch(setActiveUser(res.data))
                dispatch(setLike(res.data.likes))
            })
            .catch(err => alert(err));
        axios.get("http://localhost:3020/users")
            .then(res => {
                dispatch(setUsers(res.data))
            })
            .catch(err => alert(err));
    }, [])

    return (
        <div className="message-list">
            <ul>
                {messages.map((item, index) => (
                    <li key={item.id}>
                        <div className="newData"><strong>{newDate(item, index)}</strong></div>
                        {item.userId !== activeUser.userId ? <Message user={item} setDate={setDate}/> : <OwnMessage user={item} setDate={setDate}/>}
                    </li>
                ))}
                <li><br/></li>
            </ul>
        </div>
    );
}

export default MessageList;