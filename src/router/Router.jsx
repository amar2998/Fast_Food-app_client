import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../pages/home/Home'
import Menu from '../pages/shop/Menu'
import Register from '../components/Register'
import Update from '../pages/dashboard/Update'
import Cart from '../pages/shop/Cart'
import DashBoardLayout from '../layout/DashBoardLayout'
import PrivateRoute from '../PrivateRoutes/PrivateRoute'
import Model from '../components/Model'
import Dashboard from '../pages/dashboard/Dashboard'
import Users from '../pages/dashboard/Users'
import AddMenu from '../pages/dashboard/AddMenu'
import UpdateMenu from '../pages/dashboard/UpdateMenu'
import AlterItems from '../pages/dashboard/AlterItems'
import Payment from '../pages/shop/Payment'
import Order from '../pages/home/Order'
import MenuFood from '../components/MenuFood'
import Offer from '../pages/shop/Offer'
import Popular from '../pages/shop/Popular'
import Salad from '../pages/shop/Salad'


const Router = () => {
  return (
    <Routes>
    
        <Route path='/' element={<Home/>}></Route>
        <Route path='/menu' element={<Menu/>}></Route>
        <Route path='/menu/:id' element={<MenuFood/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Model/>}></Route>
        <Route path='/offer' element={<Offer/>}></Route>
        <Route path='/popular' element={<Popular/>}></Route>
        <Route path='/salad' element={<Salad/>}></Route>
        
        <Route path='/update-Profile' element={<Update/>}></Route>
        <Route path='/cart-page' element={<Cart/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/order' element={<Order/>}></Route>
        <Route path='dashboard' element={<PrivateRoute><DashBoardLayout/></PrivateRoute>}>
            <Route index element={<Dashboard/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='add-menu' element={<AddMenu/>}/>
            <Route path='manage-item' element={<UpdateMenu/>}/>
            <Route path='manage-item/:id' element={<AlterItems/>} />
        </Route>

    </Routes>
  )
}

export default Router