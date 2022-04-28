import React, {useEffect, useState} from "react";
import "./Message.css"
import unlike from "../../icons/love.png"
import like from "../../icons/like.png"
import {useDispatch, useSelector} from "react-redux";
import {addLike, setLike} from "../../toolkit/toolkitSlice";
import axios from "axios";

const Message = (props) => {
    const [isLike, setIsLike] = useState(false)
    const dispatch = useDispatch()
    const postLikes = useSelector(state => state.toolkit.users.postLikes)
    const activeUser = useSelector(state => state.toolkit.users.activeUser)

    useEffect(() => {
        const isLiked = activeUser.likes.find(el => el === props.user.id)
        if (isLiked)
            setIsLike(true)
    }, [activeUser])

    function addToDB(info) {
        axios.put(`http://localhost:3020/users/${activeUser.id}`, info)
            .then(() => {})
            .catch(err => alert(err));
        axios.post(`http://localhost:3020/activeUser`, info)
            .then(() => {})
            .catch(err => alert(err));
    }

    function deleteLike() {
        const arrLikes = postLikes.filter(el => el !== props.user.id)
        dispatch(setLike(arrLikes))
        const info = {
            ...activeUser,
            likes: [...arrLikes]
        }
        addToDB(info)
    }
    function getLike() {
        isLike ? deleteLike() : putLike()
        setIsLike(!isLike)
    }
    function putLike() {
        const info = {
            ...activeUser,
            likes: [...postLikes, props.user.id]
        }
        dispatch(addLike(props.user.id))
        addToDB(info)
    }

    let arrData = props.setDate(props)
    return (
        <div className="message">
            <div className="message-user-avatar item">
                <img alt="avatar" src={props.user.avatar} width="55" height="55"/>
            </div>
            <div className="message-user-name item">
                <strong>{props.user.user}</strong>
            </div>
            <div className="message-text item">
                {props.user.text}
            </div>
            <div className="message-time item">
                {props.user.editedAt ? `edit ${arrData[0]}:${arrData[1]}` : `${arrData[0]}:${arrData[1]}`}
            </div>
            <div className="message-like item">
                <input type="image" src={isLike ? like: unlike} alt="like" width="25" onClick={getLike}/>
            </div>
        </div>
    );
}

export default Message;