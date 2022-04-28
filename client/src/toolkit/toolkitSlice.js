import {createSlice} from "@reduxjs/toolkit";


const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        chat: {
            messages: [],
            editModal: false,
            preloader: true,
            inputText: '',
            lastOwn: {
                id: '',
                position: ''
            },
        },
        users: {
            users: [],
            activeUser: {},
            userModal: {status: false, type: '', id: ''},
            postLikes: []
        }
    },
    reducers: {
        setMessages(state, action) {
            state.chat.messages = action.payload
        },
        addMessage(state, action) {
            state.chat.messages.push(action.payload)
        },
        deleteMessage(state) {
            state.chat.messages.pop();
        },
        editStatus(state, action) {
            state.chat.editModal = action.payload
        },
        preloaderStatus(state, action) {
            state.chat.preloader = action.payload
        },
        inputText(state, action) {
            state.chat.inputText = action.payload
        },
        lastOwnMessage(state, action) {
            state.chat.lastOwn = action.payload
        },
        setUsers(state, action) {
            state.users.users = action.payload
        },
        addUser(state, action) {
            state.users.users.push(action.payload)
        },
        setActiveUser(state, action) {
            state.users.activeUser = action.payload
        },
        createStatus(state, action) {
            state.users.userModal = action.payload
        },
        setLike(state, action) {
            state.users.postLikes = action.payload
        },
        addLike(state, action) {
            state.users.postLikes.push(action.payload)
        },
    }
})

export default toolkitSlice.reducer
export const {
    setMessages, addMessage, deleteMessage, editStatus, preloaderStatus,
    inputText, lastOwnMessage, setUsers, addUser, setActiveUser, createStatus,
    setLike, addLike} = toolkitSlice.actions