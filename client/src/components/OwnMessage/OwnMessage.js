import React, {useContext} from "react";
import "./OwnMessage.css"
import {Context} from "../../context";
import {useSelector} from "react-redux";

const OwnMessage = (props) => {
    const {editMessage, deleteMessage} = useContext(Context)
    const lastMessageId = useSelector(state => state.toolkit.chat.lastOwn.id)
    const arrData = props.setDate(props)


    return (
        <div className="own-message">
            <div className="message-text item">
                {props.user.text}
            </div>
            <div className="message-time item">
                {props.user.editedAt ? `edit ${arrData[0]}:${arrData[1]}` : `${arrData[0]}:${arrData[1]}`}
            </div>
            {lastMessageId === props.user.id ? <div className="message-edit item">
                <input type="button" value="Edit" onClick={() => editMessage(props.user.id)}/>
            </div> : true}
            <div className="message-delete item">
                <input type="button" value="Delete" onClick={() => deleteMessage(props.user.id)}/>
            </div>
        </div>
    );
}

export default OwnMessage;