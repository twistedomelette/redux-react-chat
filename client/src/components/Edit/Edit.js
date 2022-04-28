import React, {useContext} from "react";
import "./Edit.css"
import {useDispatch, useSelector} from "react-redux";
import {editStatus, inputText} from "../../toolkit/toolkitSlice";
import {Context} from "../../context";

const Edit = () => {
    const {editTodo} = useContext(Context)
    const dispatch = useDispatch()
    const chat = useSelector(state => state.toolkit.chat)

    function handleSubmit(e) {
        editTodo({id: chat.messages[chat.lastOwn.position].id, text: chat.inputText})
        dispatch(inputText(""))
        dispatch(editStatus(false))
        e.preventDefault()
    }
    function closeEditModal() {
        dispatch(editStatus(false))
    }

    return (
        <div className="edit-message-modal">
            <div className="modal-show">
                <form className="form-edit" onSubmit={handleSubmit}>
                    <div className="edit-title">Edit Message</div>
                    <div className="edit-message-input">
                        <textarea cols="40" rows="5" value={chat.inputText} onChange={e => dispatch(inputText(e.target.value))}/>
                    </div>
                    <div className="edit-message-button">
                        <input type="submit" value="Ok"/>
                    </div>
                    <div className="edit-message-close">
                        <input type="button" value="Cancel" onClick={closeEditModal}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;