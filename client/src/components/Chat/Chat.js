import React, {useEffect} from "react";
import "./Chat.css"
import Header from "../Header/Header";
import MessageList from "../MessageList/MessageList";
import MessageInput from "../MessageInput/MessageInput";
import Preloader from "../Preloader/Preloader";
import {Context} from "../../context";
import {useDispatch, useSelector} from "react-redux";
import {
    addMessage,
    editStatus,
    preloaderStatus,
    setMessages,
    inputText,
    lastOwnMessage
} from "../../toolkit/toolkitSlice";
import Edit from "../Edit/Edit"
import axios from "axios";

const Chat = (props) => {
    const dispatch = useDispatch()
    const chat = useSelector(state => state.toolkit.chat)
    const users = useSelector(state => state.toolkit.users.users)
    const activeUser = useSelector(state => state.toolkit.users.activeUser)
    useEffect(async () => {
        axios.get(props.url)
            .then(res => dispatch(setMessages(res.data)))
            .catch(error => alert(error))
    }, [])
    useEffect(() => {
        if (chat.messages.length) {
            dispatch(preloaderStatus(false))
            chat.messages.forEach((el, index) => {
                if (el.userId === activeUser.userId)
                    dispatch(lastOwnMessage({id: el.id, position: index}))
            })
        }
    }, [chat.messages.length])

    useEffect(() => {
        const element = document.querySelector(".message-list");
        if (element) element.scrollTop = element.scrollHeight;
    }, [chat]);

    const toggleTodo = text => {
        axios.post(props.url, text)
            .then(res => {
                dispatch(addMessage(res.data))
                dispatch(lastOwnMessage({id: text.id, position: chat.messages.length-1}))
            })
            .catch(err => alert(err));
    }
    const editTodo = (data) => {
        const sItems = [...chat.messages];
        const fItems = [...chat.messages];
        sItems.splice(chat.lastOwn.position);
        fItems.splice(0, Number(chat.lastOwn.position)+1);
        const vItems = {...chat.messages[chat.lastOwn.position]};
        vItems.text = data.text;
        vItems.editedAt = `${new Date().toISOString()}`
        const allMessages = [...sItems, vItems, ...fItems];
        axios.put(`${props.url}/${vItems.id}`, vItems)
            .then(() => {})
            .catch(err => alert(err));
        dispatch(setMessages(allMessages))
    }
    const deleteMessage = async id => {
        axios.delete(`${props.url}/${id}`)
            .then(() => {})
            .catch(err => alert(err));

        for (let message of chat.messages) {
            if (message.id !== id) await axios.post(props.url, message)
                .then(() => {})
                .catch(err => alert(err));
        }
        for (let user of users) {
            await axios.post("http://localhost:3020/users", user)
                .then(() => {
                })
                .catch(err => alert(err));
        }
        const newMessages = chat.messages.filter(el => el.id !== id)
        dispatch(setMessages(newMessages))
    }
    const editMessage = id => {
        let num;
        chat.messages.forEach((el, index) => {
            if (el.id === id) num = index;
        })
        dispatch(inputText(chat.messages[num].text))
        dispatch(editStatus(true))
    }

    return (
        <Context.Provider value={{
            toggleTodo, editTodo, deleteMessage, editMessage
        }}>
            {!chat.preloader ? <div className="chat">
                {chat.editModal ? <Edit /> : true}
                <Header />
                <MessageList />
                <MessageInput />
            </div> : <Preloader/>}
        </Context.Provider>
    );
}

export default Chat;