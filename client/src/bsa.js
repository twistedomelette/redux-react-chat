import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./components/Chat/Chat";
import {LoginForm} from "./components/Login/LoginForm";
import Users from "./components/Users/Users";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setActiveUser} from "./toolkit/toolkitSlice";
import Preloader from "./components/Preloader/Preloader";
import UserModal from "./components/UserModal/UserModal";


function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.toolkit.users.activeUser)
    useEffect(() => {
        axios.get("http://localhost:3020/activeUser")
            .then(res => {
                if (!res.data.hasOwnProperty('userId') && window.location.href !== 'http://localhost:3000/login')
                    window.location.assign('http://localhost:3000/login')
                dispatch(setActiveUser(res.data))
            })
            .catch(err => alert(err));
    }, [])

    return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={user.hasOwnProperty('userId') ? <Chat url="http://localhost:3020/messages"/> : <Preloader/>}/>
              <Route path={'/login'} element={<LoginForm/>}/>
              <Route path={'/users'} element={<Users/>}/>
              <Route path={'/users/edit'} element={<UserModal/>}/>
          </Routes>
      </BrowserRouter>
    );
}

export default App;
