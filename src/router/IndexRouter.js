import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/Login';
import NewsSandBox from '../views/NewsSandBox';

import React from 'react'

export default function IndexRouter() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/abc" element={ <Navigate to="/login" replace/>}/>
            <Route path="/*" element={localStorage.getItem('token') ? <NewsSandBox/> : <Navigate to="/login" replace/>} />
        </Routes>
    </HashRouter>
  )
}
