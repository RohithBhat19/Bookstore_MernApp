import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

const App = () => {
  return (
    <>
    <Navbar/>
   
    <Routes>
       
      <Route path='/' element = {<Home/>} />
      <Route path='/books/create' element = {<CreateBook/>} />
      <Route path='/books/details/:id' element = {<ShowBook/>} />
      <Route path='/books/edit/:id' element = {<EditBook/>} />
      <Route path='/books/delete/:id' element = {<DeleteBook/>} />
      <Route path = '/login' element = {<Login />}/>
      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/logout' element = {<Logout/>}/>
    </Routes>
    </>
  )
}

export default App