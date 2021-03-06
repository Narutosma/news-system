import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/Login';
import NewsSandBox from '../views/NewsSandBox/index.jsx';
import News from '../views/News/News';
import Detail from '../views/News/Detail';

import React from 'react'

export default function IndexRouter() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/news/detail/:id" element={<Detail/>}/>
            <Route path="/" element={ <Navigate to="/home" replace/>}/>
            <Route path="/*" element={localStorage.getItem('token') ? <NewsSandBox/> : <Navigate to="/login" replace/>} />
        </Routes>
    </HashRouter>
  )
}
