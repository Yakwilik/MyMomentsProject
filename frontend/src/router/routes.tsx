
import {FC} from 'react'
import Profile from "../pages/Profile";
import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Moments from "../pages/Moments";
interface routeProps {
    path : string
    component: FC
    key: number
}

export const privateRoutes :routeProps[] = [
    {path: "/", component: Moments, key: 0},
    {path: "/profile", component: Profile, key: 1},
    {path: "/about", component: About, key: 2},
    {path: "/error", component: Error, key: 3},
]

export const routes :routeProps[] = [
    {path: "/login", component: Login, key: 5},
    {path: "signup", component: Registration, key:6}

]