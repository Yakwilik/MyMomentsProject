
import {FC} from 'react'
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
interface routeProps {
    path : string
    component: FC
}

export const privateRoutes :routeProps[] = [
    {path: "/", component: Main},
    {path: "/profile", component: Profile},
    {path: "/about", component: About},
    {path: "/error", component: Error},
]

export const routes :routeProps[] = [
    {path: "/login", component: Login},
    {path: "signup", component: Registration}

]