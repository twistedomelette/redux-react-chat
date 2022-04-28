import React from "react";
import "./Header.css"
import {useSelector} from "react-redux";

const Header = () => {
    const messages = useSelector(state => state.toolkit.chat.messages)
    let date = messages[messages.length-1].createdAt.slice(0, 10).split('-').reverse().join('.');
    const dateFormat = new Date(messages[messages.length-1].createdAt);
    const time = `${dateFormat.getHours()}:${dateFormat.getMinutes()}`
    const arrDate = time.split(':');
    const correctDate = arrDate.map(el => {
        if (el.length !== 2)
            return '0'+el;
        else
            return el;
    })
    date += ` ${correctDate[0]}:${correctDate[1]}`
    const NumUsers = Participants(messages)
    function Participants(users) {
        let diffUser = [];
        users.forEach(user => {
            if (!diffUser.find(el => el === user.userId)) {
                diffUser.push(user.userId);
            }
        })
        return diffUser.length;
    }
    return (
        <div className="header">
            <div className="header-title">
                My Chat
            </div>
            <div className="header-users-count">
                {NumUsers} participants
            </div>
            <div className="header-messages-count">
                {messages.length} message
            </div>
            <div className="header-last-message-date">
                {date} last message
            </div>
        </div>
    );
}

export default Header;