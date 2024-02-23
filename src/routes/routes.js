import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Dashboard from '../pages/Dashboard'
import Form from '../pages/Form'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PrivateRoutes from './PrivateRoutes'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/form',
                element: <Form></Form>
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
            },
            {
                path: '/login',
                element:<Login></Login>
            }
        ]
    }
])

